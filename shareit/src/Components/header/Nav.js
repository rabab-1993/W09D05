import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ImHome } from "react-icons/im";
import { MdOutlineLogout } from "react-icons/md";
import { Menu, Avatar } from "antd";
import Search from "../search/Search";

import "./style.css";
// import { logOut } from "../../reducers/login";

const Nav = () => {
  let navigate = useNavigate();
  const [info, setInfo] = useState([]);
  useEffect(() => {
    userInfo();
    // eslint-disable-next-line 
  }, []);

  const state = useSelector((state) => {
    return state;
  });

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

  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  const items = [
    {
      key: "SubMenu",
      icon: info.map(item => <Avatar key={item._id} src={item.avatar} />),
      children: [
        {
          label:info.map (item =>
            <Link to={`/profile/${item.userName}`} state={{ userId: item._id }} key={item._id}>
              profile
            </Link>
          ),
          key: "account",
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
      <Search />
      <Link to="/posts">
        <ImHome />
      </Link>
      <Menu mode="horizontal" items={items} />
    </div>
  );
};
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
// {
//   label:
//     //  show the Dashboard bar if the user is admin
//     info.role === "61a82b332b8f8814ee629667" ? (
//       <Link to="/dashboard">Dashboard</Link>
//     ) : (
//       <></>
//     ),
//   key: "dashboard",
// },
export default Nav;
