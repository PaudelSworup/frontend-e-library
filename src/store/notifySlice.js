import { createSlice } from "@reduxjs/toolkit";



const notification =
  sessionStorage.getItem("notify") != null
    ? JSON.parse(sessionStorage.getItem("notify"))
    : "";

const notifySlice = createSlice({
    name:"notify",
    initialState:{
        message:notification?.message.message
    },

    reducers:{
        setNotifiy:(state,action)=>{
            state.message = action.payload
            sessionStorage.setItem("notify", JSON.stringify(state));
        }
    }
})
export const {setNotifiy} = notifySlice.actions
export default notifySlice.reducer