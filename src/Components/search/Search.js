import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Input, Avatar } from "antd";
import { useSelector } from "react-redux";
import { ImSearch } from "react-icons/im";

import "./style.css";

const Search = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const state = useSelector((state) => {
    return state;
  });

  useEffect (() => {
    const userAccount = async () => {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/user/profile?userName=${name}`,
  
          {
            headers: {
              Authorization: `Bearer ${state.signIn.token}`,
            },
          }
        );
        setData(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    userAccount()
    // eslint-disable-next-line 
  }, [name])

  
  return (
    <>
      <div className="search">
        <Input
          size="large"
          onChange={(ev) => setName(ev.target.value)}
          placeholder="search"
          className="search-input"
          prefix={<ImSearch />}
        />

        {data.map((info) => (
          <div key={info._id} className="result">
            <Link to={`/profile/${info.userName}`} state={{userId: info._id}}>
              <Avatar size={30} src={info.avatar} />
              {info.userName}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Search;
