import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ImHome, ImSearch } from "react-icons/im";
import { MdOutlineLogout } from "react-icons/md";
import { Menu, Avatar, Input } from "antd";
import "./style.css";

const Nav = () => {
  const state = useSelector((state) => {
    return state;
  });
  // eslint-disable-next-line
  const [isLog, setIsLog] = useState();
  const [user, setUser] = useState();
  const [info, setInfo] = useState([]);
  const [current, setCurrent] = React.useState("mail");

  const onClick = (e) => {
    // console.log("click ", e);
    setCurrent(e.key);
  };
  const navigate = useNavigate();
  // eslint-disable-next-line
  useEffect(() => {
    userInfo();
    let userid = localStorage.getItem("id");
    if (userid) {
      setIsLog(true);
      setUser(userid);
    } else {
      setIsLog(false);
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };

  const userInfo = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user/profile?_id=${state.signIn.id}`,

        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      setInfo(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  
  const userAccount = async (name) => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user/account?names=${name}`,

        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      console.log(name);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const items = [
    {
      key: "SubMenu",
      icon: <Avatar src={info.avatar} />,
      children: [
        {
          label: <Link to={`/profile`}>profile</Link>,
          key: "account",
        },
        {
          label: <Link to={`/settings`}>Settings</Link>,
          key: "settings",
        },
        {
          label:
            //  show the Dashboard bar if the user is admin
            info.role === "61a82b332b8f8814ee629667" ? (
              <Link to="/dashboard">Dashboard</Link>
            ) : (
              <></>
            ),
          key: "dashboard",
        },
        {
          label: (
            <Link to="/" onClick={logOut}>
              log Out
              <MdOutlineLogout />
            </Link>
          ),
          key: "log Out",
        },
      ],
    },
  ];

  return (
    <div className="nav">
      {user ? (
        <>
          <Input
            size="large"
            onChange={(ev) => userAccount(ev.target.value)}
            placeholder="search"
            className="search-input"
            prefix={<ImSearch />}
          />

          <Link to="/posts" onClick={() => navigate("/posts")}>
            <ImHome />
          </Link>
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Nav;
