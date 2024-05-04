export const getConnectedDevices = async (type = "") => {
  return navigator.mediaDevices
    .enumerateDevices()
    .then((devices) => {
      const formatedDevices = devices
        .filter(
          (item) =>
            item?.deviceId !== "default" && (type === "" || item?.kind === type)
        )
        .map((deviceItem) => {
          let temp = deviceItem;
          temp.value = deviceItem?.deviceId;
          return temp;
        });
      return formatedDevices;
    })
    .catch((error) => {
      console.error(error);
    });
};
