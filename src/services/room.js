import api from "./api";

export const getRooms = () => {
  return api.get("rooms");
};

export const getRoom = (roomId) => {
  return api.get(`rooms/${roomId}`);
};
