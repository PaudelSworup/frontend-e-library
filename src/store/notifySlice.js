import { createSlice } from "@reduxjs/toolkit";

const notification =
  sessionStorage.getItem("notify") != null
    ? JSON.parse(sessionStorage.getItem("notify"))
    : [];

const notifySlice = createSlice({
  name:"notify",
  initialState:{
    noti:notification
  },
  reducers:{
    setNotify : (state,action)=>{
      // console.log("states",action.payload.data.find(data=>data))
      // const existingBook = state.noti.map(data=>data.books_id === action.payload.books_id && data.user_id === action.payload.user_id  )
      
     const existingBook = state.noti.find(data=>data.books_id === action.payload.books_id && data.user_id === action.payload.user_id)

      
      if( !existingBook){
        console.log("hello")
        const updates = [...state.noti , action.payload]
        state.noti = updates
        sessionStorage.setItem("notify", JSON.stringify(updates));
      }else{
        const updates = [action.payload]
        state.noti = updates
        sessionStorage.setItem("notify", JSON.stringify(updates));
      }
        
        // const newNoti = [state.noti , action.payload]
        // console.log(newNoti)
        // const updatedNoti = [...state.noti, action.payload];
        // state.noti = updatedNoti;
        // sessionStorage.setItem("notify", JSON.stringify(updatedNoti));
      // }
    }
  }
})

export const { setNotify } = notifySlice.actions;
export default notifySlice.reducer;