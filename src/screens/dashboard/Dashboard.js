import React from "react";
import { WebRTCProvider } from "./WebRTCContext";
import DashboardRenderer from "./DashboardRenderer";

const Dashboard = () => {
  return (
    <WebRTCProvider>
      <DashboardRenderer />
    </WebRTCProvider>
  );
};

export default Dashboard;
