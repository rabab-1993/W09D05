import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button } from "rsuite";
import "./register.css";

const Register = () => {
  const [msg, setMsg] = useState("");
  const [role, setRole] = useState("");
  const [register, setRegister] = useState({
    userName: "",
    email: "",
    password: "",
    avatar: "",
    role: "61a82ae32b8f8814ee629665",
  });
  const navigate = useNavigate();
  const creatUser = async () => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/register`,
        register
      );
      console.log(result.data);
      setMsg("Active your Email");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Form onChange={setRegister} value={register}>
        <Form.Group controlId="name-6">
          <Form.ControlLabel>Username</Form.ControlLabel>
          <Form.Control name="userName" />
          <Form.HelpText>Required</Form.HelpText>
        </Form.Group>
        <Form.Group controlId="email-6">
          <Form.ControlLabel>Email</Form.ControlLabel>
          <Form.Control name="email" type="email" />
          <Form.HelpText tooltip>Required</Form.HelpText>
        </Form.Group>
        <Form.Group controlId="password-6">
          <Form.ControlLabel>Password</Form.ControlLabel>
          <Form.Control name="password" type="password" autoComplete="off" />
        </Form.Group>

        <Button appearance="primary" onClick={creatUser}>
          Register
        </Button>
      </Form>
      <h1>{msg}</h1>
    </div>
  );
};

export default Register;
