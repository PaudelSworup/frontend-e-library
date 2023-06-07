import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import notifyReducer from "./notifySlice"


const store = configureStore({
    reducer:{
        users:userReducer,
        notify:notifyReducer
    }
})


export default store