import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Input } from "antd";
import "./register.css";

const Register = () => {
  const [msg, setMsg] = useState("");
  const [register, setRegister] = useState({
    userName: "",
    email: "",
    password: "",
    avatar: "",
    role: "61a82ae32b8f8814ee629665",
  });
  const navigate = useNavigate();
  const creatUser = async () => {
    console.log(register);
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/register`,
        register
      );
      console.log(result.data);
      navigate("/");
      setMsg("Active your Email");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="registe">
      <h1>Creat an Account</h1>
      <>
        {/* User Name Field */}
        <Input
          label="User Name"
          value={register.userName}
          onChange={(ev) =>
            setRegister({ ...register, userName: ev.target.value })
          }
        />

        {/* Email Field */}
        <Input
          label="Email"
          type="email"
          value={register.email}
          onChange={(ev) =>
            setRegister({ ...register, email: ev.target.value })
          }
        />

        {/* Password Field */}
        <Input
          label="Password"
          type="password"
          value={register.password}
          onChange={(ev) =>
            setRegister({ ...register, password: ev.target.value })
          }
        />

        <Button appearance="primary" onClick={creatUser}>
          Register
        </Button>
      </>
      <h1>{msg}</h1>
    </div>
  );
};

export default Register;
