import React from "react";
import { Routes, Route, } from "react-router-dom";
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

const RoutePath = () => {


  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      

      <Route path="/" element={<PrivateRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<SearchedItem />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="home/book/detail/:id" element={<BookDetail />} />
        <Route path="/book/detail/:id" element={<BookDetail />} />
        <Route path="/book/genre/:name/:id" element={<CategoryData />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/book/saved" element={<SavedItems />} />
      </Route>
    </Routes>
  );
};

export default RoutePath;
