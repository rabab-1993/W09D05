import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Input, Form, message } from "antd";

import image from "../../img/undraw_Upload_image_re_svxx.png";
import "./register.css";

const Register = () => {
  const [register, setRegister] = useState({
    userName: "",
    email: "",
    password: "",
    avatar: "",
    role: "61a82ae32b8f8814ee629665",
  });
  const creatUser = async () => {
    try {
      // eslint-disable-next-line
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/register`,
        register
      );
      setRegister(" ")
      message.success('Please Activate Your Email')
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="registe">
      <div className="img-section">
        <h2>Share It</h2>
        <img src={image} alt="" className="img" />
      </div>
      <h1>
        Creat an Account
        <Form
          className="register-form "
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 16,
          }}
          autoComplete="off"
        >
          {/* User Name Field */}
          <Form.Item
            label="User Name"
            name="userName"
            rules={[
              {
                required: true,
                message: "Please Enter your User Name!",
              },
            ]}
          >
            <Input
              value={register.userName}
              onChange={(ev) =>
                setRegister({ ...register, userName: ev.target.value })
              }
            />
          </Form.Item>
          {/* Email Field */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please Enter your Email!",
              },
            ]}
          >
            <Input
              value={register.email}
              onChange={(ev) =>
                setRegister({ ...register, email: ev.target.value })
              }
            />
          </Form.Item>
          {/* Password Field */}
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please Enter your password!",
              },
            ]}
          >
            <Input.Password
              value={register.password}
              onChange={(ev) =>
                setRegister({ ...register, password: ev.target.value })
              }
            />
          </Form.Item>
          <Button appearance="primary" onClick={creatUser}>
            Register
          </Button>
          <h4>
            You have an account?
            <Link to="/" className="register">
              Log In
            </Link>
          </h4>
        </Form>
      </h1>
    </div>
  );
};

export default Register;
