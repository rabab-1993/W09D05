import { Routes, Route } from "react-router-dom";
import Home from "./Components/home/Home";
import Login from "./Components/account/Login";
import Register from "./Components/account/Register";
import './App.css';
import Post  from "./Components/post/Post";

function App() {
  return (
    <div className="App">
       <Login />
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/posts" element={<Post />} />
      </Routes>
    </div>
  );
}

export default App;
