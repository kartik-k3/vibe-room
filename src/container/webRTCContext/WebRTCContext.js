import PropTypes from "prop-types";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { MEDIA_CONSTRAINTS_OBJECT } from "../../config/constants/MEDIA_CONSTRAINTS";
import { WEBRTC_CONFIG } from "../../config/constants/WEBRTC_CONFIG";
import { firebaseUserConfig } from "../../config/helper/firebaseHelpers";
import { getGeneratedRoomId } from "../../config/helper/webRTCHelpers";

const WebRTCContext = createContext();

export const WebRTCProvider = ({ children }) => {
  //User Data
  const userData = useSelector((state) => state?.user?.user);

  //States for Media capture and configuration
  const [MEDIA_CONSTRAINTS, setMEDIACONSTRAINTS] = useState(
    MEDIA_CONSTRAINTS_OBJECT
  );
  const [selectedDevices, setSelectedDevices] = useState({
    audio: "",
    video: "",
  });
  const localMediaRef = useRef(null);

  //States for WebRTC Connection
  const [RTCState, setRTCState] = useState({
    peerConnection: null,
    dataChannel: null,
    status: "idle",
  });

  //States for Meeting Settings
  const [roomSettings, setRoomSettings] = useState({
    roomId: "",
    participants: {},
  });

  //Methods for Changing Meeting Settings
  const changeRoomId = (roomId) => {
    if (!roomId) roomId = getGeneratedRoomId();
    setRoomSettings((prevState) => {
      return { ...prevState, roomId: roomId };
    });
    return roomId;
  };

  //Methods for Media capture and settings
  const stopCurrentStream = () => {
    //Stops the current stream
    if (localMediaRef.current && localMediaRef.current.srcObject) {
      localMediaRef.current.srcObject
        .getTracks()
        .forEach((track) => track.stop());
    }
  };

  const changeAudioInputDevice = (deviceId) => {
    stopCurrentStream(); //Stopping current Stream to start new one with Selected device.
    setSelectedDevices((prevState) => {
      return { ...prevState, audio: deviceId };
    });
    startAudioVideoStream({
      ...MEDIA_CONSTRAINTS,
      audio: {
        deviceId: deviceId,
      },
    });
  };

  const startAudioVideoStream = useCallback(
    (mediaConstraints) => {
      delete mediaConstraints.screenSharing;
      if (!localMediaRef?.current) throw new Error("Could not find video tag.");
      if (!mediaConstraints?.audio?.deviceId && selectedDevices?.audio) {
        //If toggle video function is calling with audio true then put the selected Device here
        mediaConstraints = {
          ...mediaConstraints,
          audio: { deviceId: selectedDevices?.audio },
        };
      }
      navigator.mediaDevices
        .getUserMedia({
          ...mediaConstraints,
          audio: { ...mediaConstraints.audio, noiseSuppression: true }, //Noise Suppression stays on for every microphone
        })
        .then((stream) => {
          const audioTrack = stream.getAudioTracks()[0];
          if (!MEDIA_CONSTRAINTS?.audio) {
            //The Audio Stays On but stays disabled if mute is on for seamless connectivity.
            audioTrack.enabled = false;
          }
          localMediaRef.current.srcObject = stream;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    [localMediaRef, selectedDevices, MEDIA_CONSTRAINTS?.audio]
  );

  const toggleMuteMic = () => {
    const newConstraints = {
      ...MEDIA_CONSTRAINTS,
      audio: !MEDIA_CONSTRAINTS.audio, //This is not used just to keep track of the audio status
    };
    localMediaRef?.current?.srcObject
      .getAudioTracks()
      .forEach((track) => (track.enabled = newConstraints?.audio));
    setMEDIACONSTRAINTS(newConstraints);
  };

  const toggleWebCam = () => {
    stopCurrentStream();
    const newConstraints = {
      ...MEDIA_CONSTRAINTS,
      video: !MEDIA_CONSTRAINTS.video, //This is used while toggling start audio video
    };
    startAudioVideoStream({
      ...newConstraints,
      audio: newConstraints?.audio || true,
      // Always keep audio active to avoid restarting the stream. Muting is handled separately.
    });
    setMEDIACONSTRAINTS(newConstraints);
  };

  //WebRTC Methods
  const firebaseConfig = useMemo(() => {
    //Function closure with node refs and listeners encapsulated
    return firebaseUserConfig({
      roomId: roomSettings?.roomId,
      userId: userData?.user_id,
      setRTCState, // IDK if it is ok to send it to firebase helper
      setRoomSettings,
      localMediaRef,
    });
  }, [roomSettings?.roomId, userData?.user_id]);

  const signalingChannel = useCallback(
    (action) => {
      if (action?.offer) {
        firebaseConfig?.joinRoom({
          name: userData?.email?.split("@")?.[0],
          preferences: MEDIA_CONSTRAINTS,
        });
      } else {
        console.error("No Action Found");
      }
    },
    [firebaseConfig, MEDIA_CONSTRAINTS, userData?.email]
  );

  const initializePeers = useCallback(() => {
    //Initializing WebRTC peers
    const peerConnection = new RTCPeerConnection(WEBRTC_CONFIG);
    setRTCState((prevState) => {
      return {
        ...prevState,
        peerConnection: peerConnection,
        status: "initialized",
      };
    });
  }, [setRTCState]);

  const joinRoom = useCallback(async () => {
    //Creating new offer and setting SDP (Session Description Protocol) Locally
    signalingChannel({ offer: true });
  }, [signalingChannel]);

  //Context.Provider Rendered with children
  return (
    <WebRTCContext.Provider
      value={{
        localMediaRef,
        controls: {
          startAudioVideoStream,
          toggleMuteMic,
          toggleWebCam,
          changeAudioInputDevice,
        },
        initializePeers,
        joinRoom,
        roomSettings: { changeRoomId, roomSettings },
        RTCState,
      }}
    >
      {children}
    </WebRTCContext.Provider>
  );
};

WebRTCProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useWebRTC = () => {
  const context = useContext(WebRTCContext);
  if (!context) {
    throw new Error("useWebRTC must be used within a WebRTCProvider");
  }
  return context;
};
