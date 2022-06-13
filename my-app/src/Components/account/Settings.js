import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import Nav from "../header/Nav";

const Settings = () => {
  const [data, setData] = useState([]);
  const state = useSelector((state) => {
    return state;
  });
  useEffect(() => {
    getProfile();
    // eslint-disable-next-line
  }, []);
  const getProfile = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user/profile?_id=${state.signIn.id}`,

        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      console.log(result.data);
      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Nav />
      <div>Settings</div>
    </>
  );
};

export default Settings;
