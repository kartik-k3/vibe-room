import React from "react";
import { Button } from "@mui/material";
import { getGeneratedRoomId } from "../../config/helper/webRTCHelpers";
import UIBackground from "../../components/uiCard/UIBackground";
import CustomTypography from "../../components/ui/CustomTypography";
import { useNavigate } from "react-router-dom";

const EntryScreen = () => {
  const navigate = useNavigate();

  const redirectToDashboard = () => {
    navigate(`${getGeneratedRoomId()}`);
  };

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
