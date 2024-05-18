import React from "react";
import { Button, Typography } from "@mui/material";
import UIBackground from "../../components/uiCard/UIBackground";
import { useWebRTC } from "../../container/webRTCContext/WebRTCContext";
import UiSelect from "../../components/ui/UiSelect";
import { useForm } from "react-hook-form";
import { getConnectedDevices } from "../../config/helper/webRTCHelpers";
import { useEffect, useState } from "react";

const DashboardRenderer = () => {
  const { localMediaRef, controls } = useWebRTC();
  const [deviceListOptions, setDeviceListOptions] = useState([]);
  const { control } = useForm();

  useEffect(() => {
    getConnectedDevices("audioinput")
      ?.then((formatedDevices) => {
        setDeviceListOptions(formatedDevices);
        controls?.changeAudioInputDevice(formatedDevices?.[0]?.deviceId);
      })
      ?.catch((error) => console.error(error));
  }, []);

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
      <div
        style={{
          width: "20%",
          marginTop: "8px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <UiSelect
          name="device"
          control={control}
          options={deviceListOptions || []}
          rules={{ required: "This field is required" }}
          label="Select a Device"
          defaultValue={deviceListOptions?.[0]}
          onChangeCallback={(device) => {
            controls.changeAudioInputDevice(device?.value);
          }}
        />
      </div>
    </UIBackground>
  );
};

export default DashboardRenderer;
