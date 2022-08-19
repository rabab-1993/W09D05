import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

const Activate = () => {
  const navigate = useNavigate();
  useEffect(() => {
    regiset();
  }, []);
  const regiset = async () => {
    try {
      // eslint-disable-next-line
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/activated`
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <>
        <h1>Email has been Activated</h1>
        <Button onClick={navigate("/")}>Login Page</Button>
      </>
    </div>
  );
};

export default Activate;
