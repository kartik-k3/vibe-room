import { Button, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import UiSelect from "../../components/ui/UiSelect";
import UIBackground from "../../components/uiCard/UIBackground";
import useParamsValidation from "../../container/customHooks/useParamsValidation";
import { useWebRTC } from "../../container/webRTCContext/WebRTCContext";

const DashboardRenderer = ({ deviceListOptions = [] }) => {
  useParamsValidation();

  const { localMediaRef, controls, joinRoom } = useWebRTC();
  const { control } = useForm();

  return (
    <UIBackground>
      <>
        <Typography style={{ color: "white" }}>hello</Typography>
        <div style={{ display: "flex", visibility: "hidden" }}>
          <video
            id="User1"
            autoPlay
            controls={false}
            ref={localMediaRef}
            muted={true}
          />
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
        <div>
          <Button variant="contained" onClick={joinRoom}>
            Join Room
          </Button>
        </div>
      </>
    </UIBackground>
  );
};

export default DashboardRenderer;
