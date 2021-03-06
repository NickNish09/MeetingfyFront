import api from "./api";

export const getRooms = () => {
  return api.get("rooms");
};

export const getRoom = (roomId) => {
  return api.get(`rooms/${roomId}`);
};

export const createRoom = (name, capability) => {
  return api.post(`rooms`, {name, capability});
};

export const updateRoom = (roomId, name, capability) => {
  return api.put(`rooms/${roomId}`, {name, capability});
};

export const deleteRoom = (roomId) => {
  return api.delete(`rooms/${roomId}`);
};

export const createEvent = (room_id, meeting_start, meeting_end, title) => {
  return api.post("meetings", {
    meeting_start,
    meeting_end,
    title,
    room_id
  })
};

export const deleteEvent = (meetingId) => {
  return api.delete(`meetings/${meetingId}`);
};
