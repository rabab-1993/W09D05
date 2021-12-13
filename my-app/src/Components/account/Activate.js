import React, {useState, useEffect} from 'react';
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
const Activate = () => {
    const navigate = useNavigate();
    useEffect(() => {
        regiset()
    }, [])
    const regiset = async () => {
        try {
          const result = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/user/activated`,
    
            // {
            //   headers: {
            //     Authorization: `Bearer ${state.signIn.token}`,
            //   },
            // }
          );
          const data = {
            posts: result.data,
          };
        //   dispatch(getPost(data));
          console.log(result.data);
        } catch (error) {
          console.log(error);
        }
      };
    return (
        <div>
          <h1>Email has been Activated</h1>  
        </div>
    )
}

export default Activate
