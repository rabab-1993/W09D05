import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ImHome } from "react-icons/im";
import { MdOutlineLogout } from "react-icons/md";
import { Menu, Avatar } from "antd";
import Search from "../search/Search";
import { logOut } from "../../reducers/login";
import "./style.css";

const Nav = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch()
  const [info, setInfo] = useState([]);
  const state = useSelector((state) => {
    return state;
  });

  useEffect(() => {
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
      userInfo();
    // eslint-disable-next-line
  }, [state.signIn.id]);

  const signOut = () => {
    navigate("/login");
    dispatch(logOut())
  };

  const items = [
    {
      key: "SubMenu",
      icon: info.map((item) => <Avatar key={item._id} src={item.avatar} />),
      children: [
        {
          label: info.map((item) => (
            <Link
              to={`/profile/${item.userName}`}
              state={{ userId: item._id }}
              key={item._id}
            >
              profile
            </Link>
          )),
          key: "account",
        },
        {
          label: (
            <Link to="/" onClick={signOut}>
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
      {state.signIn.id ? <Menu mode="horizontal" items={items} /> : <></>}
      
    </div>
  );
};
export default Nav;
