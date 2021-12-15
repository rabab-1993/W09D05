import { Routes, Route } from "react-router-dom";
import Home from "./Components/home/Home";
import Login from "./Components/account/Login";
import Register from "./Components/account/Register";
import './App.css';
import Post  from "./Components/post/Post";
import Profile from "./Components/profile/Profile"
import Activate from "./Components/account/Activate";
import Forget from './Components/forgetPass/Forget'
import ResetPass from "./Components/forgetPass/ResetPass";

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
        <Route exact path="/activate/" element={<Activate />} />
        <Route exact path="/forget" element={<Forget />} />
        <Route exact path="/reset-pass/:id" element={<ResetPass />} />
      </Routes>
    </>
  );
}

export default App;
