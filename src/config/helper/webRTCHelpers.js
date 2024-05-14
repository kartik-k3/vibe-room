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
          const temp = deviceItem;
          temp.value = deviceItem?.deviceId;
          return temp;
        });
      return formatedDevices;
    })
    .catch((error) => {
      console.error(error);
    });
};

const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const getGeneratedRoomId = (len = 6) => {
  const letters = "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ";
  let generatedString = "";
  for (let i = 0; i < len; i++) {
    generatedString = generatedString + letters[generateRandomNumber(0, 51)];
  }
  debugger;
  return generatedString;
};
