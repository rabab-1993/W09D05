import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ImHome } from "react-icons/im";
// import {Avatar , AvatarGroup} from 'rsuite';
import Avatar from "@mui/material/Avatar";
import "./style.css";

const Nav = () => {
  const [isLog, setIsLog] = useState();
  const [user, setUser] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    let userid = localStorage.getItem("id");
    if (userid) {
      setIsLog(true);
      setUser(userid);
    } else {
      setIsLog(false);
      navigate("/");
    }
  }, []);

  const logOut = () => {
    localStorage.clear();
    navigate("/");
    // window.location.reload(false);
  };
  return (
    <div className="nav">
      {user ? (
        <nav>
          <Link to="/posts" onClick={() =>  navigate("/posts")}>
            <ImHome />
          </Link>
          <Link to="/" onClick={logOut}>
            Log out
          </Link>
          <Avatar
            alt="avatar"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 56, height: 56 }}
            onClick={() =>  navigate("/profile")}
          />
        </nav>
      ) : (
        <nav></nav>
      )}
    </div>
  );
};

export default Nav;
