import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { logIn } from "../../reducers/login";
import { Form, Button, ButtonToolbar } from "rsuite";
import { FcGoogle } from "react-icons/fc";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state;
  });

  const [log, setLogIn] = useState({
    // userName
    email: "",
    password: "",
  });
  //   A handle function to login with google
  const handleGoogle = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user/auth/google`
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  //
  const userLog = async () => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/login`,
        log
      );
      const data = {
        token: result.data.token,
        user: result.data.result,
      };
      dispatch(logIn(data));
      navigate("/posts");
      console.log(state);
    } catch (error) {
      console.log(error);
    }
  };
  

  let toRegisterPage = () => {
    navigate("/register");
  };
  let forgetPage = () => {
    navigate("/forget");
  };
  // let toPostPage = () => {
  //   userLog();
  // };
  return (
    <div>
      <Form fluid onChange={setLogIn} value={log}>
        <Form.Group>
          <Form.ControlLabel>Username or email address</Form.ControlLabel>
          <Form.Control name="email" />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel>Password</Form.ControlLabel>
          <Form.Control name="password" type="password" autoComplete="off" />
        </Form.Group>
        <Form.Group>
          <ButtonToolbar>
            <Button appearance="primary" onClick={userLog}>
              Login
            </Button>
            <Button appearance="link" onClick={forgetPage}>Forgot password?</Button>
          </ButtonToolbar>
        </Form.Group>
      </Form>
      <h3>
        <FcGoogle className="icon" onClick={handleGoogle} />
        Log in with google
      </h3>
      <h1>
        Dosn't have an account?
        <Link to="/register" onClick={toRegisterPage} className="register">
          Register
        </Link>
      </h1>
    </div>
  );
};

export default Login;
