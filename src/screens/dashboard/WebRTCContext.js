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

  const startAudioVideoStream = ({ mediaConstraints = MEDIA_CONSTRAINTS }) => {
    // const merge = (boxTypes, truckSize) => {
    //   debugger;
    //   boxTypes.sort((a, b) => a[1] - b[1]).reverse();
    //   let count = 0;
    //   while (truckSize > 0) {
    //     if (boxTypes[0][0] == 0) {
    //       boxTypes.splice(0, 1);
    //     }
    //     if(boxTypes.length == 0) return count;
    //     boxTypes[0][0]--;
    //     count = boxTypes[0][1] + count;
    //     truckSize--;
    //   }
    //   return count;
    // };
    // merge();
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
    if (!newConstraints?.video)
      startAudioVideoStream({ mediaConstraints: newConstraints });
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
