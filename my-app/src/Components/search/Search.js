import React, {useState} from "react";
import axios from "axios";
import { Input } from "antd";
import Nav from "../header/Nav";
import "./style.css";

const Search = () => {
  const [text, setText] = useState("");
  return (
    <>
      <Nav />
      <div className="search">
        Search 
        <Input
          size="large"
          value={text}
          onChange={(ev) => setText(ev.target.value)}
          placeholder="search"
          className="search-input"
        />
      </div>
    </>
  );
};

export default Search;
