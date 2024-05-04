import { createContext, useContext, useEffect, useRef, useState } from "react";
import { MEDIA_CONSTRAINTS_OBJECT } from "../../config/constants/MEDIA_CONSTRAINTS";

const WebRTCContext = createContext();

export const WebRTCProvider = ({ children }) => {
  const [MEDIA_CONSTRAINTS, setMEDIACONSTRAINTS] = useState(
    MEDIA_CONSTRAINTS_OBJECT
  );
  const localMediaRef = useRef(null);

  const getLocalConnectionDetails = () => {
    return {
      mediaConstraints: MEDIA_CONSTRAINTS,
    };
  };

  const stopCurrentStream = () => {
    if (localMediaRef.current && localMediaRef.current.srcObject) {
      localMediaRef.current.srcObject
        .getTracks()
        .forEach((track) => track.stop());
    }
  };

  const startAudioVideoStream = ({ mediaConstraints = MEDIA_CONSTRAINTS }) => {
    // const merge = (nums) => {
    //   debugger;
    //   nums.sort((a, b) => a - b);
    //   if (nums[0] !== 0) return 0;
    //   const binSearch = (start, end) => {
    //     debugger;
    //     let middle = Math.floor((start + end) / 2);
    //     if(start > end) return start
    //     if (nums[middle] === middle) {
    //       return binSearch(middle + 1, end);
    //     } else {
    //       return binSearch(start, middle - 1);
    //     }
    //   };
    //   return binSearch(0, nums.length - 1);
    // };
    // merge([0, 2, 3]);
    if (mediaConstraints !== MEDIA_CONSTRAINTS)
      setMEDIACONSTRAINTS(mediaConstraints);
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
