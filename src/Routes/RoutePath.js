import React from "react";
import { Routes, Route } from "react-router-dom";
import SearchedItem from "../components/SearchedItem";
import Home from "../components/Home";
import Profile from "../components/Profile";
import BookDetail from "../components/BookDetail";
import CategoryData from "../components/CategoryData";
import Collection from "../components/Collection";
import SavedItems from "../components/SavedItems";
import Login from "../components/Login";
import Register from "../components/Register";
import PrivateRoute from "../auth/PrivateRoute";
import LandingPage from "../components/LandingPage";
import RequestStatus from "../components/RequestStatus";
import Notification from "../components/Notification";
import Confirmation from "../components/Confirmation";
import Forgot from "../components/Forgot";
import ResendVerification from "../components/ResendVerification";
import AddBook from "../components/Admin/AddBook";
import AddCategory from "../components/Admin/AddCategory";
import AdminRoute from "../auth/AdminRoute";
import Header from "../components/Header";
import SideBar from "../components/Admin/SideBar";
import Demos from "../components/Demos";
import Modal from "../components/Modals/Modal";
import Cards from "../components/Cards";
import Navs from "../components/Navs";


const RoutePath = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/confirmation/:token" element={<Confirmation />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/resendverification" element={<ResendVerification />} />
      <Route path="/sidebar" element={<SideBar/>}/>
      <Route path="/modal" element={<Modal/>} />
      <Route path="/demo" element={<Demos/>} /> 
      <Route path="/card" element={<Cards/>} />
      <Route path="/nav" element={<Navs/>} />

      <Route path="/" element={<PrivateRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<SearchedItem />} />
        <Route path="home/book/detail/:id" element={<BookDetail />} />
        <Route path="/book/detail/:id" element={<BookDetail />} />
        <Route path="/book/genre/:name/:id" element={<CategoryData />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/book/saved" element={<SavedItems />} />
        <Route path="/book/requests" element={<RequestStatus />} />
        <Route path="/book/status" element={<Notification />} />
        <Route path="/account-settings" element={<Profile />} />
      </Route>

      <Route path="/" element={<AdminRoute />}>
        <Route path="/admin" element={<AddBook />} />
        <Route path="/addcategory" element={<AddCategory />} />
        {/* <Route path="/main" element={<Admin/>} /> */}
      </Route>
    </Routes>
  );
};

export default RoutePath;
