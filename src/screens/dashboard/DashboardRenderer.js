import { Button, Typography } from "@mui/material";
import UIBackground from "../../components/uiCard/UIBackground";
import { useWebRTC } from "./WebRTCContext";
import UiSelect from "../../components/ui/UiSelect";
import { useForm } from "react-hook-form";
import { getConnectedDevices } from "../../config/helper/webRTCHelpers";
import { useEffect, useState } from "react";
import { MEDIA_CONSTRAINTS_OBJECT } from "../../config/constants/MEDIA_CONSTRAINTS";

const DashboardRenderer = () => {
  const { localMediaRef, controls } = useWebRTC();
  const { control, handleSubmit } = useForm();
  const [deviceListOptions, setDeviceListOptions] = useState([]);

  useEffect(() => {
    getConnectedDevices("audioinput")
      ?.then((formatedDevices) => {
        setDeviceListOptions(formatedDevices);
        // controls?.startAudioVideoStream({ ...MEDIA_CONSTRAINTS_OBJECT });
      })
      ?.catch((error) => console.error(error));
  }, []);

  const here = (formData) => {
    debugger;
    console.log(formData);
  };

  return (
    <UIBackground>
      <Typography style={{ color: "white" }}>hello</Typography>
      <div style={{ display: "flex" }}>
        <video id="User1" autoPlay controls={false} ref={localMediaRef} />
        {/* <video id="User2" controls={false} /> */}
      </div>
      <Button variant="contained" onClick={controls?.startAudioVideoStream}>
        Start Video
      </Button>
      <Button variant="contained" onClick={controls?.toggleMuteMic}>
        Toggle Mic
      </Button>
      <Button variant="contained" onClick={controls?.toggleWebCam}>
        Toggle WebCam
      </Button>
      <div style={{ width: "100%" }}>
        <UiSelect
          name="device"
          control={control}
          options={deviceListOptions || []}
          rules={{ required: "This field is required" }}
          label="start mic"
        />
        <Button onClick={handleSubmit(here)}>PEEP</Button>
      </div>
    </UIBackground>
  );
};

export default DashboardRenderer;
