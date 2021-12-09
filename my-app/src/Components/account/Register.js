import React, {useState} from 'react';
import axios from "axios";
import { Form } from 'rsuite';
import './register.css';
const Register = () => {
    const [register, setRegister] = useState({
        email: "",
        password: "",
        role: "",
      });

      const creatUser = async () => {
        try {
          const result = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/user/register`,
            register
          );
          console.log(result.data);
        } catch (error) {
          console.log(error);
        }
      };
    return (
        <div>
            
        </div>
    )
}

export default Register
