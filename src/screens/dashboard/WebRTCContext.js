import { createContext, useContext, useEffect, useRef, useState } from "react";

const WebRTCContext = createContext();

export const WebRTCProvider = ({ children }) => {
  const [MEDIA_CONSTRAINTS, setMEDIACONSTRAINTS] = useState({
    audio: true,
    video: true,
  });
  const localMediaRef = useRef(null);

  const getLocalConnectionDetails = () => {};

  const stopCurrentStream = () => {
    if (localMediaRef.current && localMediaRef.current.srcObject) {
      localMediaRef.current.srcObject
        .getTracks()
        .forEach((track) => track.stop());
    }
  };

  //   useEffect(() => {
  //   if (localMediaRef.current) {
  //     navigator.mediaDevices.addEventListener("devicechange", (event) => {
  //       debugger;
  //       console.log(event);
  //       getConnectedDevices();
  //     });
  //     navigator.mediaDevices
  //       .getUserMedia(MEDIA_CONSTRAINTS)
  //       .then((stream) => {
  //         debugger;
  //         localMediaRef.current.srcObject = stream;
  //       })
  //       .catch((error) => {
  //         debugger;
  //         console.error("Error accessing media devices.", error);
  //       });
  //   }
  //     debugger;
  //     console.log(MEDIA_CONSTRAINTS);
  //   }, []);

  const startAudioVideoStream = ({ mediaConstraints = MEDIA_CONSTRAINTS }) => {
    if (!localMediaRef?.current) throw new Error("Could not find video tag.");
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then((stream) => {
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
    startAudioVideoStream({ mediaConstraints: newConstraints });
    setMEDIACONSTRAINTS(newConstraints);
  };

  return (
    <WebRTCContext.Provider
      value={{
        localMediaRef,
        startAudioVideoStream,
        toggleMuteMic,
        toggleWebCam,
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
