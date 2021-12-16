import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

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
      navigate("/")
      setMsg("Active your Email");
     
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="registe">
         <h1>Creat an Account</h1>
      <Container>
      <Stack spacing={5} className="register-form">
          {/* User Name Field */}
          <TextField
            required
            id="standard-required"
            label="User Name"
           
            variant="standard"
            value={register.userName}
            onChange={(ev) =>
                setRegister({ ...register, userName: ev.target.value })
            }
          />

          {/* Email Field */}
          <TextField
            required
            id="standard-required"
            label="Email"
           
            type="email"
            variant="standard"
            value={register.email}
            onChange={(ev) =>
                setRegister({ ...register, email: ev.target.value })
            }
          />

          {/* Password Field */}
          <TextField
            required
            id="standard-password-input"
            label="Password"
          
            type="password"
            autoComplete="current-password"
            variant="standard"
            value={register.password}
            onChange={(ev) =>
                setRegister({ ...register, password: ev.target.value })
            }
          />

        <Button appearance="primary" onClick={creatUser}>
          Register
        </Button>
      </Stack>
      </Container>
      <h1>{msg}</h1>
    </div>
  );
};

export default Register;
