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
        const updates = [...state.noti, action.payload];
        state.noti = updates;
        sessionStorage.setItem("notify", JSON.stringify(updates));
      } else {
        const updates = [action.payload];
        state.noti = updates;

        sessionStorage.setItem("notify", JSON.stringify(updates));
      }
    },
  },
});

export const { setNotify } = notifySlice.actions;
export default notifySlice.reducer;

// thunks
// export const fetchNotifications = (userid) => {
//   return async (dispatch) => {
//     try {
//       const response = await getNotified(userid);
//       if (response?.data.success && response?.data.notification.length > 0) {
//         const { notification } = response?.data;
//         dispatch(setNotify({ data: notification }));
//       }

//       if (response?.data?.notification.length === 0) {
//         sessionStorage.removeItem('notify');
//       }
//     } catch (error) {
//       console.log('Error fetching notifications:', error);
//     }
//   };
// };
