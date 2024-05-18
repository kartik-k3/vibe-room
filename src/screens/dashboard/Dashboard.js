import React from "react";
import { WebRTCProvider } from "../../container/webRTCContext/WebRTCContext";
import DashboardRenderer from "./DashboardRenderer";

const Dashboard = () => {
  return (
    <WebRTCProvider>
      <DashboardRenderer />
    </WebRTCProvider>
  );
};

export default Dashboard;
