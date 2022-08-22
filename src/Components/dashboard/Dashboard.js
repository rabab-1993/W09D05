import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { List, message, Avatar, Skeleton, Divider } from "antd";
import Nav from "../header/Nav";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    allUsers();
    allPosts();

    // eslint-disable-next-line
  }, []);
  const state = useSelector((state) => {
    return state;
  });

  const allUsers = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user/users`,

        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      setData([...data, ...result.data]);
      setLoading(false);
      console.log(result.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const allPosts = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/posts`,

        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      // console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Nav />
      <div>Dashboard</div>
      {data.length &&
        data.map((user) => {
          return <h4>{data.userName}</h4>;
        })}
    </>
  );
};

export default Dashboard;
