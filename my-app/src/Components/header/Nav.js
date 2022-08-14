import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ImHome, ImSearch } from "react-icons/im";
import { MdOutlineLogout } from "react-icons/md";
import { Menu, Avatar, Input } from "antd";
import "./style.css";

const Nav = () => {
  // eslint-disable-next-line
  const [user, setUser] = useState();
  const [info, setInfo] = useState([]);

  const state = useSelector((state) => {
    return state;
  });

  const navigate = useNavigate();
  // eslint-disable-next-line

  useEffect(() => {
    userInfo();
    // let userid = localStorage.getItem("id");
    // if (userid) {
    //   setUser(userid);
    // } else {
    //   navigate("/");
    // }
    // eslint-disable-next-line
  }, []);

  const logOut = () => {
    navigate("/");
    localStorage.clear();
  };

  // eslint-disable-next-line
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
      // key: "SubMenu",
      icon: info.map((item) => <Avatar key={item._id} src={item.avatar} />),
      children: [
        {
          label: <Link to={`/profile/${info.userName}`}>profile</Link>,
          key: "account",
        },
        {
          label: <Link to={`/settings`}>Settings</Link>,
          key: "settings",
        },

        // (info.role === "61a82b332b8f8814ee629667" ? (
        //   {
        //     label: (

        //       <Link to="/dashboard">Dashboard</Link>
        //     ),
        //     key: "dashboard",
        //   }
        // ) : (
        //   <></>
        // )),
        {
          label:
            //  show the Dashboard bar if the user is admin
            (info.role === "61a82b332b8f8814ee629667" ? (
              <Link to="/dashboard">Dashboard</Link>
              ) : (
                <></>
            )),
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
      {state.signIn.id ? (
        <>
          <Input
            size="large"
            onChange={(ev) => userAccount(ev.target.value)}
            placeholder="search"
            className="search-input"
            prefix={<ImSearch />}
          />

          <Link to="/posts">
            <ImHome />
          </Link>
          <Menu mode="horizontal" items={items} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Nav;
