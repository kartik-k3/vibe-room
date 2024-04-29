import { Button, Typography } from "@mui/material";
import UIBackground from "../../components/uiCard/UIBackground";
import { useWebRTC } from "./WebRTCContext";

const DashboardRenderer = () => {
  const { localMediaRef, startAudioVideoStream, toggleMuteMic, toggleWebCam } =
    useWebRTC();

  return (
    <UIBackground>
      <Typography style={{ color: "white" }}>hello</Typography>
      <div style={{ display: "flex" }}>
        <video id="User1" autoPlay controls={false} ref={localMediaRef} />
        {/* <video id="User2" controls={false} /> */}
      </div>
      <Button variant="contained" onClick={startAudioVideoStream}>
        Start Video
      </Button>
      <Button variant="contained" onClick={toggleMuteMic}>
        Toggle Mic
      </Button>
      <Button variant="contained" onClick={toggleWebCam}>
        Toggle WebCam
      </Button>
    </UIBackground>
  );
};

export default DashboardRenderer;
