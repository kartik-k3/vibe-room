import { Button, Typography } from "@mui/material";
import UIBackground from "../../components/uiCard/UIBackground";
import { useWebRTC } from "./WebRTCContext";
import UiSelect from "../../components/ui/UiSelect";
import { useForm } from "react-hook-form";

const DashboardRenderer = () => {
  const { localMediaRef, controls } = useWebRTC();
  const { control, handleSubmit } = useForm();

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
          options={[{ label: "Hello", value: "Hello As well" }]}
          rules={{ required: "This field is required" }}
          label="start mic"
        />
        <Button onClick={handleSubmit(here)}>PEEP</Button>
      </div>
    </UIBackground>
  );
};

export default DashboardRenderer;
