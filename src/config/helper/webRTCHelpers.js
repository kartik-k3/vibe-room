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

export const getGeneratedRoomId = (len = 7) => {
  const letters = "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ";
  let generatedString = "";
  for (let i = 0; i < len; i++) {
    generatedString = generatedString + letters[generateRandomNumber(0, 51)];
    if ((i + 1) % 3 === 2) generatedString = generatedString + "-";
  }
  return generatedString;
};

export const isValidRoomId = (roomId) => {
  // This regex will match a string that starts with two letters followed by a hyphen,
  const regex = /^[a-zA-Z]{2}-[a-zA-Z]{3}-[a-zA-Z]{2}$/;
  // repeating this pattern until the end of the string, which should be a letter.
  return regex.test(roomId);
  // It assumes the length of the string is exactly as produced by getGeneratedRoomId.
};
