import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/home/Home";
import Login from "./Components/account/Login";
import Register from "./Components/account/Register";
import Post from "./Components/post/Post";
import Profile from "./Components/profile/Profile";
import Activate from "./Components/account/Activate";
import Forget from "./Components/forgetPass/Forget";
import ResetPass from "./Components/forgetPass/ResetPass";
// import Dashboard from "./Components/dashboard/Dashboard";
import Search from "./Components/search/Search";
import 'antd/dist/antd.min.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import "./App.css";

function App() {
  return (
    <>
      {/* <Nav /> */}
      <Routes>
        <Route exact path="/posts" element={<Home />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/posts" element={<Post />} />
        <Route exact path="/profile/:userName" element={<Profile />} />
        <Route exact path="/activate/" element={<Activate />} />
        <Route exact path="/forget" element={<Forget />} />
        <Route exact path="/reset-pass/:id" element={<ResetPass />} />
        {/* <Route exact path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </>
  );
}

export default App;
