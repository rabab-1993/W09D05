import React, { useState } from "react";
import axios from "axios";
import "./style.css";
const Forget = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const forgetPass = async () => {
      console.log(email);
    try {
      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/user/forget`,
        {email}
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
      <input
        type="email"
        name="email"
        id=""
        placeholder="email"
       defaultValue={email}
        onChange={(ev) => setEmail(ev.target.value)}
      />
      <button onClick={forgetPass}>Send</button>
      <h1>{msg}</h1>
    </div>
  );
};

export default Forget;
