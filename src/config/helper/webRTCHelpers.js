export const getConnectedDevices = async (type = "") => {
  navigator.mediaDevices
    .enumerateDevices()
    .then((devices) => {
      debugger;
      return devices;
    })
    .catch((error) => {
      console.error(error);
    });
};
