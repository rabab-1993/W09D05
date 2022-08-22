import React, { useState } from "react";
import axios from "axios";
import { Button, Input } from "antd";

// import "./style.css";
const Forget = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const forgetPass = async () => {
    console.log(email);
    try {
      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/user/forget`,
        { email }
      );

      console.log(result);
      setMsg("Check your Email for resetting your passowrd");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Enter your email</h1>
      {/* Email Field */}
      <Input
        placeholder="default size"
        value={email}
        onChange={(ev) => setEmail(ev.target.value)}
      />

      <Button onClick={forgetPass}>Submit</Button>

      <h1>{msg}</h1>
    </div>
  );
};

export default Forget;
