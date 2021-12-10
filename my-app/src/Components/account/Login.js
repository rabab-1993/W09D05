import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../reducers/login";
import { Form, Button, ButtonToolbar } from "rsuite";
import { FcGoogle } from "react-icons/fc";
import "./login.css";

const Login = () => {
  // let navigate = useNavigate();
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
        user: result.data.result._id,
      };
      dispatch(logIn(data));
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* <Form layout="inline" onChange={setLogIn} value={log}>
        <Form.Group controlId="username-7">
          <Form.ControlLabel>Username/email</Form.ControlLabel>
          <Form.Control name="email" style={{ width: 160 }} type="text"/>
          <Form.HelpText tooltip>Required</Form.HelpText>
        </Form.Group>

        <Form.Group controlId="password-7">
          <Form.ControlLabel>Password</Form.ControlLabel>
          <Form.Control
            name="password"
            type="password"
            autoComplete="off"
            style={{ width: 160 }}
          />
        </Form.Group>

        <Button onClick={userLog}>Login</Button>
      </Form>
      <h3>Log in with google</h3>
      <FcGoogle className="icon" onClick={handleGoogle} /> */}
      <Form fluid onChange={setLogIn} value={log}>
        <Form.Group>
          <Form.ControlLabel>Username or email address</Form.ControlLabel>
          <Form.Control name="name" />
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
            <Button appearance="link">Forgot password?</Button>
          </ButtonToolbar>
        </Form.Group>
      </Form>
      <h3>
        <FcGoogle className="icon" onClick={handleGoogle} />
        Log in with google
      </h3>
    </div>
  );
};

export default Login;
