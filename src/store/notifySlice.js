import { createSlice } from "@reduxjs/toolkit";

const notification =
  sessionStorage.getItem("notify") != null
    ? JSON.parse(sessionStorage.getItem("notify"))
    : [];

const notifySlice = createSlice({
  name: "notify",
  initialState: {
    noti: notification,
  },
  reducers: {
    setNotify: (state, action) => {
      
      const existingBook = state.noti.find(
        (data) =>
          data.books_id === action.payload.books_id &&
          data.user_id === action.payload.user_id
      );

      if (!existingBook) {
        console.log(action)
        const updates = [...state.noti, action.payload];
        state.noti = updates;
        sessionStorage.setItem("notify", JSON.stringify(updates));
      } else {
        console.log(action.payload)
        const updates = [action.payload];
        state.noti = updates;
        console.log(updates)
        sessionStorage.setItem("notify", JSON.stringify(updates));
      }
    },
  },
});

export const { setNotify } = notifySlice.actions;
export default notifySlice.reducer;
