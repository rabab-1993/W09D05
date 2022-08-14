import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Form } from "antd";
import { logIn } from "../../reducers/login";
import "./login.css";
import image from "../../img/undraw_Social_interaction_re_dyjh.png";
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

  const userId = state.signIn.token;
  useEffect(() => {
    if (userId) {
      navigate("/posts");
    } else {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

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

  return (
    <div className="login">
      <h1>
        Share It
        <img src={image} alt="" className="img" />
      </h1>
      <Form
        className="login-form"
        name="basic"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 16,
        }}
        // initialValues={{
        //   remember: true,
        // }}
        autoComplete="off"
      >
        {/* Email Field */}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            value={log.email}
            onChange={(ev) => setLogIn({ ...log, email: ev.target.value })}
          />
        </Form.Item>
        {/* Password Field */}
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            value={log.password}
            onChange={(ev) => setLogIn({ ...log, password: ev.target.value })}
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button appearance="primary" onClick={userLog}>
            Login
          </Button>
        </Form.Item>
        <Link to="/forget" className="register">
          Forgot password?
        </Link>
        <h4>
          Dosn't have an account?

          <Link to="/register" className="register">
            Register
          </Link>
        </h4>
      </Form>
    </div>
  );
};

export default Login;
