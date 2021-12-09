import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "../account/Login";
function Home() {
  const navigate = useNavigate();

  let toRegisterPage = () => {
    navigate("/register");
  };
  return (
    <div>
      <Login />
      <h1>
        Dosn't have an account?
        <Link to="/register" onClick={toRegisterPage}>
          Register
        </Link>
      </h1>
    </div>
  );
}

export default Home;
