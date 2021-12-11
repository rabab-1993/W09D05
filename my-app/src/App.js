import { Routes, Route } from "react-router-dom";
import Home from "./Components/home/Home";
import Login from "./Components/account/Login";
import Register from "./Components/account/Register";
import './App.css';
import Post  from "./Components/post/Post";
import Profile from "./Components/profile/Profile"


function App() {
  return (
    <>
     
       {/* <Login /> */}
      <Routes>
        <Route exact path="/posts" element={<Home />} />
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/posts" element={<Post />} />
        <Route exact path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
