// import { createSlice } from "@reduxjs/toolkit";

// const notification =
//   sessionStorage.getItem("notify") != null
//     ? JSON.parse(sessionStorage.getItem("notify"))
//     : [];

// const notifySlice = createSlice({
//   name: "notify",
//   initialState: {
//     data: notification,
//   },

//   reducers: {
//     setNotify: (state, action) => {
//       state.data.push(action.payload)
//       sessionStorage.setItem("notify", JSON.stringify(state.data));
//     },
//   },
// });
// export const { setNotify } = notifySlice.actions;
// export default notifySlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const notification =
  sessionStorage.getItem("notify") != null
    ? JSON.parse(sessionStorage.getItem("notify"))
    : [];

const notifySlice = createSlice({
  name:"notify",
  initialState:{
    data:notification
  },
  reducers:{
    setNotify : (state,action)=>{
      const userdetail = JSON.parse(sessionStorage.getItem("userInfo"))
      console.log(userdetail)
      const existingBook = state.data.find(data=>data.books_id._id === action.payload.books_id._id && data.user_id === action.payload.user_id  )
      if(!existingBook){
        state.data.push(action.payload)
        sessionStorage.setItem("notify", JSON.stringify(state.data));
      }
    }
  }
})

export const { setNotify } = notifySlice.actions;
export default notifySlice.reducer;
