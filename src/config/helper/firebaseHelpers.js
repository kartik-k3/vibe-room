import {
  child,
  onChildChanged,
  onChildRemoved,
  onChildAdded,
  onDisconnect,
  ref,
  update,
  orderByChild,
  query,
  startAt,
} from "firebase/database";
import { database } from "../../firebase";
import { WEBRTC_CONFIG } from "../constants/WEBRTC_CONFIG";

// firebaseConfig is a function closure that configures Firebase operations for a specific room and user and encapsulates that data.
export const firebaseUserConfig = ({
  roomId = "",
  userId = "",
  setRTCState,
  setRoomSettings,
}) => {
  if (!roomId || !userId) return;
  try {
    const vibeRoomRef = ref(database, `viberooms/${roomId}`); //Room ref
    let startListeningTime = Date.now();

    //Listener for child node modified
    try {
      onChildChanged(vibeRoomRef, (snapshot) => {
        const data = snapshot?.val();
        debugger;
        console.log(data);
      });
    } catch (error) {
      console.log(error.message);
    }

    //Listener for child added in room and updates the participants
    try {
      const queryRef = query(
        vibeRoomRef,
        orderByChild("timestamp"),
        startAt(startListeningTime)
      );
      onChildAdded(queryRef, (snapshot) => {
        const data = snapshot?.val();
        debugger;
        if (data) {
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
          handleOffer(data?.key);
        }
      });
    } catch (error) {
      console.log(error.message);
    }

    //Listener for child removed in room and updates the participants
    onChildRemoved(vibeRoomRef, (snapshot) => {
      const data = snapshot?.val();
      if (data?.key && data?.key !== userId) {
        setRoomSettings((prevState) => {
          const participantsObject = prevState?.participants;
          delete participantsObject[data?.key];
          return {
            ...prevState,
            participants: { ...participantsObject },
          };
        });
      }
    });

    // userDataRef is a reference to a child node with the current userId under the 'viberooms/roomId' node.
    const userDataRef = child(vibeRoomRef, userId);

    // createRoom is a function that sets the offer data for the user in the database.
    const joinRoom = ({ name = "Anonymous", preferences = {} }) => {
      try {
        update(userDataRef, { name: name, preferences: preferences });
        startListeningTime = Date.now();
      } catch (error) {
        console.error(error);
      }
    };

    const handleOffer = (recipientId) => {
      setRTCState(async (prevState) => {
        let currentPeerConnection = prevState?.peerConnection;
        if (!currentPeerConnection) {
          currentPeerConnection = new RTCPeerConnection(WEBRTC_CONFIG);
        }
        const offer = await currentPeerConnection?.createOffer();
        currentPeerConnection?.setLocalDescription(offer);
        update(ref(database, vibeRoomRef + "/offers/" + recipientId), {
          data: offer,
        });
        return {
          ...prevState,
          peerConnection: currentPeerConnection,
          status: "calling",
        };
      });
    };

    onDisconnect(userDataRef).remove(); //Removes user node when the client disconnects
    return { joinRoom };
  } catch (error) {
    console.log(error?.message);
  }
};
