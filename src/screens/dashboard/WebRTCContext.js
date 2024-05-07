import { createContext, useContext, useEffect, useRef, useState } from "react";
import { MEDIA_CONSTRAINTS_OBJECT } from "../../config/constants/MEDIA_CONSTRAINTS";

const WebRTCContext = createContext();

export const WebRTCProvider = ({ children }) => {
  const [MEDIA_CONSTRAINTS, setMEDIACONSTRAINTS] = useState(
    MEDIA_CONSTRAINTS_OBJECT
  );
  const [selectedDevices, setSelectedDevices] = useState({
    audio: "",
    video: "",
  });
  const localMediaRef = useRef(null);

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

  const startAudioVideoStream = (mediaConstraints) => {
    if (!localMediaRef?.current) throw new Error("Could not find video tag.");
    debugger;
    if (!mediaConstraints?.audio?.deviceId && selectedDevices?.audio) {
      //If toggle video function is calling with audio true then put the selected Device here
      mediaConstraints = {
        ...mediaConstraints,
        audio: { deviceId: selectedDevices?.audio },
      };
    }
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
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
  };

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
