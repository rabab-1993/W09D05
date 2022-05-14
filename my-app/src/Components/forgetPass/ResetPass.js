import React, { useState } from "react";
import axios from "axios";
import { Button, Input } from "antd";
const ResetPass = () => {
  const [Password, setPass] = useState("");

  const passReset = async () => {
    console.log(Password);
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user/reset-pass/:res-tok`,
        { Password }
      );
      console.log(result.data);
      //   navigate("/")
      setPass("Password has been reset");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Input.Password
        placeholder="password"
        value={Password.Password}
        onChange={(ev) => setPass(ev.target.value)}
      />

      <Button onClick={passReset}>Submit</Button>
    </div>
  );
};

export default ResetPass;
