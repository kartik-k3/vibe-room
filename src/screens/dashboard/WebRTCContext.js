import { createContext, useContext, useEffect, useRef, useState } from "react";
import { MEDIA_CONSTRAINTS_OBJECT } from "../../config/constants/MEDIA_CONSTRAINTS";

const WebRTCContext = createContext();

export const WebRTCProvider = ({ children }) => {
  const [MEDIA_CONSTRAINTS, setMEDIACONSTRAINTS] = useState(
    MEDIA_CONSTRAINTS_OBJECT
  );
  const localMediaRef = useRef(null);

  const stopCurrentStream = () => {
    if (localMediaRef.current && localMediaRef.current.srcObject) {
      localMediaRef.current.srcObject
        .getTracks()
        .forEach((track) => track.stop());
    }
  };

  const startAudioVideoStream = ({ mediaConstraints = MEDIA_CONSTRAINTS }) => {
    if (!localMediaRef?.current) throw new Error("Could not find video tag.");
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then((stream) => {
        const audioTrack = stream.getAudioTracks()[0];
        if (!MEDIA_CONSTRAINTS?.audio) {
          //The Audio Stays On but stays disabled if mute is on for seamless.
          audioTrack.enabled = false;
        }
        localMediaRef.current.srcObject = stream;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const toggleMuteMic = () => {
    const newConstraints = {
      ...MEDIA_CONSTRAINTS,
      audio: !MEDIA_CONSTRAINTS.audio,
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
      video: !MEDIA_CONSTRAINTS.video,
    };
    startAudioVideoStream({
      mediaConstraints: {
        ...newConstraints,
        audio: newConstraints?.audio || true,
      },
    });
    setMEDIACONSTRAINTS(newConstraints);
  };

  return (
    <WebRTCContext.Provider
      value={{
        localMediaRef,
        controls: { startAudioVideoStream, toggleMuteMic, toggleWebCam },
      }}
    >
      {children}
    </WebRTCContext.Provider>
  );
};

export const useWebRTC = () => {
  const context = useContext(WebRTCContext);
  if (!context) {
    throw new Error("useWebRTC must be used within a WebRTCProvider");
  }
  return context;
};
