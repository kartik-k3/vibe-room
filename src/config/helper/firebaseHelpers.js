import {
  child,
  onChildAdded,
  onChildRemoved,
  onDisconnect,
  ref,
  update,
} from "firebase/database";
import { database } from "../../firebase";
import { WEBRTC_CONFIG } from "../constants/WEBRTC_CONFIG";
import _ from "lodash";

// firebaseConfig is a function closure that configures Firebase operations for a specific room and user and encapsulates that data.
export const firebaseUserConfig = ({
  roomId = "",
  userId = "",
  setRTCState,
  setRoomSettings,
  localMediaRef,
}) => {
  if (!roomId || !userId) return;
  try {
    const vibeRoomRef = ref(database, `viberooms/${roomId}`); //Room ref
    //userDataRef is a reference to a child node with the current userId under the 'viberooms/roomId' node.
    const userDataRef = child(vibeRoomRef, userId);
    //offerRef is a reference to a node inside userId under offers.
    const offerRef = child(vibeRoomRef, `${userId}/offers`);
    //answerRef is a reference to a node inside userId under answers.
    const answerRef = child(vibeRoomRef, `${userId}/answers`);
    //ICERef is a reference to a node inside userId under ICE.
    const ICERef = child(vibeRoomRef, `${userId}/ICE`);

    let RTCState = {}; //* Use this to an object we use to keep track of the RTCState of multiple peers
    let initializationTime; //Time at which the node was added to the room
    let stopListening; //Function to detach listeners

    //Starts listening only when user joins the call, Only initialised when current user joins room successfully
    const initialiseParticipantAddedListeners = () => {
      //Listener for child added in room and updates the participants
      const childAddedListener = onChildAdded(vibeRoomRef, (snapshot) => {
        setTimeout(() => {
          const data = snapshot?.val();
          const parentKey = snapshot?.ref?.parent?.key;

          //* Only listen for direct child added in vibeRoomRef (i.e Participants) && only if data is available and the user added is not the current user himself
          if (parentKey !== vibeRoomRef?.key) return;
          if (!data || userId === snapshot?.key) return;

          //Setting a new participant in roomSettings and the RTC State locally for each participant added regardless of time of joining
          setRoomSettings((prevState) => {
            return {
              ...prevState,
              participants: {
                ...prevState?.participants,
                [data?.key]: {
                  preferences: data?.preferences,
                  name: data?.name,
                },
              },
            };
          });
          RTCState = {
            ...RTCState,
            [snapshot?.key]: {
              peerConnection: new RTCPeerConnection(WEBRTC_CONFIG),
              status: "Initialised",
            },
          };
          if (localMediaRef?.current && localMediaRef?.current?.srcObject) {
            localMediaRef?.current?.srcObject
              .getTracks()
              .forEach((track) =>
                RTCState[snapshot?.key]?.peerConnection?.addTrack(
                  track,
                  localMediaRef?.current?.srcObject
                )
              );
          }
          // !Only offer when the participant is newly added and user has joined room
          if (data?.timeStamp <= initializationTime || !initializationTime)
            return;

          sendOffer(snapshot?.key);
        }, 0);
      });

      //Created closure and calling this function to detach Listener
      const removeAllListeners = () => {
        vibeRoomRef?.off("child_added", childAddedListener);
      };
      return removeAllListeners;
    };

    //Listener for child removed in room and updates the participants
    const childRemovedListener = onChildRemoved(vibeRoomRef, (snapshot) => {
      if (!snapshot?.key || snapshot?.key === userId) {
        if (snapshot?.key === userId) {
          //If Current User is not a part of the room then remove initialization time so that it does not causes any issues while re joining room with old initialization time
          initializationTime = null;
          stopListening && stopListening();
        }
        return;
      }
      setRoomSettings((prevState) => {
        const participantsObject = prevState?.participants;
        delete participantsObject[snapshot?.key];
        return {
          ...prevState,
          participants: { ...participantsObject },
        };
      });
    });

    //Listeners for Offers, Answers, ICE Candidates
    const offersListener = onChildAdded(offerRef, (snapshot) => {
      setTimeout(() => {
        const data = snapshot.val();
        handleOfferAndSendAnswer({ participantId: snapshot?.key, offer: data });
      }, 0);
    });

    const answerListener = onChildAdded(answerRef, (snapshot) => {
      setTimeout(() => {
        if (!RTCState?.[snapshot?.key]) return;
        const data = snapshot?.val();
        handleAnswer({ participantId: snapshot?.key, answer: data });
      }, 0);
    });

    //ICE Candidate Listener for Signaling server
    const ICEListener = onChildAdded(ICERef, (snapshot) => {
      setTimeout(async () => {
        if (!RTCState?.[snapshot?.key]) return;
        const data = snapshot?.val();
        try {
          await RTCState?.[snapshot?.key]?.peerConnection.addIceCandidate(data);
        } catch (error) {
          console.error("Error adding received ice candidate", error);
        }
      }, 0);
    });

    //Local Listener for ICE Candidates Generated
    const initializeICEListeners = () => {
      if (!RTCState) return;
      const clonedRTCState = _.cloneDeep(RTCState);
      for (let participant in clonedRTCState) {
        const peerConnection = clonedRTCState[participant]?.peerConnection;
        if (peerConnection) {
          peerConnection.addEventListener(
            "icecandidate",
            (event) => {
              debugger;
              if (event?.candidate) {
                sendICECandidates(participant, event.candidate);
              }
            },
            (error) => {
              console.error("Error during ICE candidate gathering: ", error);
            }
          );
        }
      }
    };

    const initializeConnectionEstablishedListeners = (participantObj) => {
      try {
        const participant = { ...participantObj };
        if (!participant || !participant.peerConnection) {
          console.log(
            "Participant or peerConnection was undefined while trying to initialize connection established listener"
          );
          return;
        }
        participant.peerConnection.addEventListener(
          "icecandidateerror",
          (event) => {
            debugger;
            console.error("ICE candidate error:", event);
          }
        );

        participant.peerConnection.addEventListener(
          "connectionstatechange",
          (event) => {
            debugger;
            console.log(
              `Connection state changed: ${participant.peerConnection.connectionState}`
            );
            if (participant.peerConnection.connectionState === "connected") {
              // Peers connected!
              console.log("Peers connected:", event);
            } else if (
              participant.peerConnection.connectionState === "failed"
            ) {
              // Connection failed
              console.log("Connection failed:", event);
            }
          }
        );
      } catch (error) {
        console.error(
          "Error in connection state change listener:",
          error.message
        );
      }
    };

    //Methods for Firebase
    //joinRoom is a function that sets the initial user data (i.e name, preferences, timeStamp) of the user joining, in the database.
    const joinRoom = ({ name = "Anonymous", preferences = {} }) => {
      const dateNow = Date.now();
      update(userDataRef, {
        name: name,
        preferences: preferences,
        timeStamp: dateNow,
      })
        .then(() => {
          initializationTime = dateNow;
          stopListening = initialiseParticipantAddedListeners();
          setRoomSettings((prevState) => {
            return { ...prevState, isFirebaseConnected: dateNow };
          });
        })
        .catch((error) => {
          console.error(
            "Error Encountered while trying to join the room",
            error?.message
          );
        });
    };

    //We offer SDP to the newly Added participant or to any id that is recieved by this function.
    const sendOffer = async (recipientId) => {
      const prevState = RTCState[recipientId];
      let currentPeerConnection = prevState?.peerConnection;
      if (!currentPeerConnection) {
        currentPeerConnection = new RTCPeerConnection(WEBRTC_CONFIG);
      }
      const offer = await currentPeerConnection?.createOffer();
      currentPeerConnection?.setLocalDescription(offer);
      RTCState = {
        ...RTCState,
        [recipientId]: {
          ...prevState,
          peerConnection: currentPeerConnection,
          status: "offered",
        },
      };
      initializeICEListeners();
      setRTCState(RTCState);

      //Firebase method for updating the data
      update(ref(database, `viberooms/${roomId}/${recipientId}/offers`), {
        [userId]: offer,
      }).catch((error) => {
        console.log("Error Encountered while Sending Offer", error?.message);
      });
    };

    //We take offers recieved and set to our peer connection and answer them in this function
    const handleOfferAndSendAnswer = async ({ participantId, offer }) => {
      try {
        const prevState = RTCState?.[participantId];
        let currentPeerConnection = prevState?.peerConnection;
        if (!currentPeerConnection) {
          currentPeerConnection = new RTCPeerConnection(WEBRTC_CONFIG);
        }
        currentPeerConnection.setRemoteDescription(
          new RTCSessionDescription(offer)
        );
        const answer = await currentPeerConnection.createAnswer();
        await currentPeerConnection.setLocalDescription(answer);

        RTCState = {
          ...RTCState,
          [participantId]: {
            ...prevState,
            peerConnection: currentPeerConnection,
            status: "answered",
          },
        };
        setRTCState(RTCState);
        initializeConnectionEstablishedListeners(RTCState[participantId]);
        //Firebase Method for sending answer into the the recipients answers node
        update(ref(database, `viberooms/${roomId}/${participantId}/answers`), {
          [userId]: answer,
        }).catch((error) => {
          console.error(error.message);
        });
      } catch (error) {
        console.error("Error while answering", error.message);
      }
    };

    const handleAnswer = async ({ participantId, answer }) => {
      try {
        const prevState = RTCState?.[participantId];
        let currentPeerConnection = prevState?.peerConnection;

        if (!currentPeerConnection) {
          currentPeerConnection = new RTCPeerConnection(WEBRTC_CONFIG);
        }
        //With this we are connected to the participant through WebRTC
        const remoteDesc = new RTCSessionDescription(answer);
        await currentPeerConnection.setRemoteDescription(remoteDesc);

        RTCState = {
          ...RTCState,
          [participantId]: {
            ...prevState,
            peerConnection: currentPeerConnection,
            status: "connected",
          },
        };
        initializeConnectionEstablishedListeners(RTCState?.[participantId]);
        setRTCState(RTCState);
      } catch (error) {
        console.error("Error Encountered while handling answer", error.message);
      }
    };

    const sendICECandidates = (recipientId, ICECandidate) => {
      //Firebase method for updating the data
      update(ref(database, `viberooms/${roomId}/${recipientId}/ICE`), {
        [userId]: ICECandidate,
      }).catch((error) => {
        console.log("Error Encountered while Sending Offer", error?.message);
      });
    };

    onDisconnect(userDataRef)
      ?.remove()
      ?.then(() => {
        stopListening && stopListening();
        console.log(
          childRemovedListener,
          offersListener,
          answerListener,
          ICEListener
        ); // TODO Need to use or remove variables
      }); //Removes user node and detaches room listener when the client disconnects
    return { joinRoom };
  } catch (error) {
    console.log(error?.message);
  }
};
