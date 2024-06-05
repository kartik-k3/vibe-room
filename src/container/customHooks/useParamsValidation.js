import { useEffect } from "react";
import toast from "react-hot-toast";
import { isValidRoomId } from "../../config/helper/webRTCHelpers";
import { useWebRTC } from "../webRTCContext/WebRTCContext";

const useParamsValidation = () => {
  const { pathname: location } = window.location;
  const { roomSettings } = useWebRTC();
  useEffect(() => {
    const churney = location.substring(location.length - 9, location.length); //Will run twice because the react 18 strict mode is turned on
    if (!isValidRoomId(churney)) {
      toast.error("Invalid Meeting Link.");
    } else {
      roomSettings?.changeRoomId(churney); //funny name
    }
  }, [location, roomSettings]);
};

export default useParamsValidation;
