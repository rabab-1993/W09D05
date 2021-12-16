import React, {useEffect} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
const Activate = () => {
  const navigate = useNavigate();
    useEffect(() => {
        regiset()
    }, [])
    const regiset = async () => {
        try {
          const result = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/user/activated`,
          );
          console.log(result.data);
        } catch (error) {
          console.log(error);
        }
      };
    return (
        <div>
           <Stack spacing={5} className="register-form">

          <h1>Email has been Activated</h1>  
          <Button appearance="primary" onClick={  navigate("/")}>
            Login Page
          </Button>
           </Stack>
        </div>
    )
}

export default Activate
