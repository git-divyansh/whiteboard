import { createSlice } from "@reduxjs/toolkit";

const nameData = sessionStorage.getItem("user-name");
const roomId = sessionStorage.getItem("room-id");

const initialState = {
  name: nameData ? JSON.parse(nameData) : null,
  roomid: roomId ? JSON.parse(roomId) : null,
  message: [],
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    changeIncomingMessage: (state, action) => {
      state.message.push(action.payload);
    },
    updateUsername: (state, action) => {
      state.name = action.payload;
      sessionStorage.setItem("user-name", JSON.stringify(state.name));
    },
    updateRoomId: (state, action) => {
      state.roomid = action.payload;
      sessionStorage.setItem("room-id", JSON.stringify(state.roomid));
    },
    removeNameRoomId: (state, action) => {
      state.name = action.payload;
      state.roomid = action.payload;
      state.message = [];
      sessionStorage.removeItem("user-name");
      sessionStorage.removeItem("room-id");
    },
  },
});

export const {
  changeIncomingMessage,
  updateUsername,
  updateRoomId,
  removeNameRoomId,
} = roomSlice.actions;

export default roomSlice.reducer;
