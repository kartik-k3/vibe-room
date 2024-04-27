import { Typography } from "@mui/material";
import UIBackground from "../../components/uiCard/UIBackground";
import { useEffect, useRef } from "react";

const Dashboard = () => {
  const userVideoRef = useRef(null);

  useEffect(() => {
    if (userVideoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then((stream) => {
          userVideoRef.current.srcObject = stream;
        })
        .catch((error) => {
          console.error("Error accessing media devices.", error);
        });
    }
  }, []);

  return (
    <UIBackground>
      <Typography style={{ color: "white" }}>hello</Typography>
      <div style={{ display: "flex" }}>
        <video id="User1" controls={false} ref={userVideoRef} />
        <video id="User2" controls={false} />
      </div>
    </UIBackground>
  );
};

export default Dashboard;
