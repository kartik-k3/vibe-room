import { database } from "../../firebase";
import { onValue, ref } from "firebase/database";

export const createRoom = (roomId = "adminSuite") => {
  const vibeRoomRef = ref(database, `viberooms/${roomId}`);
  onValue(vibeRoomRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    debugger;
  });
};
