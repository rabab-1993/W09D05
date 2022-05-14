import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../header/Nav";

const Dashboard = () => {
  useEffect(() => {
    allUsers();
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
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Nav />
      <div>Dashboard</div>
    </>
  );
};

export default Dashboard;
