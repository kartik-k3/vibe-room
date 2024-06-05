import { Button } from "@mui/material";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import CustomTypography from "../../components/ui/CustomTypography";
import UIBackground from "../../components/uiCard/UIBackground";
import { useWebRTC } from "../../container/webRTCContext/WebRTCContext";

const EntryScreen = () => {
  const navigate = useNavigate();
  const { roomSettings } = useWebRTC();

  const redirectToDashboard = useCallback(() => {
    //Creates a new Meeting Link and Redirects to it
    navigate(`${roomSettings?.changeRoomId()}`);
  }, [navigate, roomSettings]);

  return (
    <>
      <UIBackground
        customStyle={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <CustomTypography variant="h4">
            Video Calls and Meetings for everyone
          </CustomTypography>
          <CustomTypography variant="h7">
            Viberoom Provides Secure, Easy-to-use Video Calls and Meetings for
            Everyone, on any Device.
          </CustomTypography>
          <div style={{ display: "flex" }}>
            <Button onClick={redirectToDashboard} variant="contained">
              New Meeting
            </Button>
            <Button>Enter Code or Link</Button>
          </div>
        </div>
      </UIBackground>
    </>
  );
};

export default EntryScreen;
