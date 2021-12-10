import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Form, Button } from "rsuite";
import "./register.css";

const Register = () => {
  const location = useLocation;
  const [role, setRole] = useState("");
  const [register, setRegister] = useState({
    userName: "",
    email: "",
    password: "",
    role: "61a82ae32b8f8814ee629665",
  });

  const creatUser = async () => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/register`,
        register
      );
      console.log(result.data);
      setRole(result.data.role);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      
      <Form onChange={setRegister} value={register}>
        <Form.Group controlId="name-6">
          <Form.ControlLabel>Username</Form.ControlLabel>
          <Form.Control name="userName"/>
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
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Register;
