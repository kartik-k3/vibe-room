import React, { useEffect, useState } from "react";
import DashboardRenderer from "./DashboardRenderer";
import { getConnectedDevices } from "../../config/helper/webRTCHelpers";
import { useWebRTC } from "../../container/webRTCContext/WebRTCContext";

const Dashboard = () => {
  const { controls, initializePeers } = useWebRTC();
  const [deviceListOptions, setDeviceListOptions] = useState([]);

  useEffect(() => {
    initializePeers();
    getConnectedDevices("audioinput")
      ?.then((formatedDevices) => {
        setDeviceListOptions(formatedDevices);
        controls?.changeAudioInputDevice(formatedDevices?.[0]?.deviceId);
      })
      ?.catch((error) => console.error(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initializePeers]);

  return (
    <>
      <DashboardRenderer deviceListOptions={deviceListOptions} />
    </>
  );
};

export default Dashboard;
