import { createSlice } from "@reduxjs/toolkit";

const userInfo =
  localStorage.getItem("userInfo") != null
    ? JSON.parse(localStorage.getItem("userInfo"))
    : "";
console.log(userInfo);

const userSlice = createSlice({
  name: "users",
  initialState: {
    token:userInfo.token,
    fullname:userInfo.fullname,
    email: userInfo.email,
    address: userInfo.address,
    mobilenum: userInfo.mobilenum,
    categories: userInfo.categories,
  },

  reducers: {
    setLogin: (state, action) => {
      state.token = action.payload.token;
      state.fullname = action.payload.fullname;
      state.email = action.payload.email;
      state.address = action.payload.address;
      state.mobilenum = action.payload.mobilenum;
      state.categories = action.payload.categories;
      localStorage.setItem("userInfo", JSON.stringify(state));
    },

    setLogout: (state) => {
      state.token = null;
      state.fullname = null;
      state.email = null;
      state.address = null;
      state.mobilenum = null;
      state.categories = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setLogin, setLogout } = userSlice.actions;

export default userSlice.reducer;
