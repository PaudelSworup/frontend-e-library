import { createSlice } from "@reduxjs/toolkit";

const userInfo =
  localStorage.getItem("userInfo") != null
    ? JSON.parse(localStorage.getItem("userInfo"))
    : "";
console.log(userInfo);

const userSlice = createSlice({
  name: "users",
  initialState: {
    id:userInfo.id,
    token:userInfo.token,
    role:userInfo.role,
    fullname:userInfo.fullname,
    email: userInfo.email,
    address: userInfo.address,
    mobilenum: userInfo.mobilenum,
    categories: userInfo.categories,
  },

  reducers: {
    setLogin: (state, action) => {
      state.id = action.payload.id
      state.token = action.payload.token;
      state.fullname = action.payload.fullname;
      state.role = action.payload.role
      state.email = action.payload.email;
      state.address = action.payload.address;
      state.mobilenum = action.payload.mobilenum;
      state.categories = action.payload.categories;
      localStorage.setItem("userInfo", JSON.stringify(state));
    },

    setLogout: (state) => {
      state.id=null
      state.token = null;
      state.fullname = null;
      state.role = null
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
