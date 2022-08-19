import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Avatar } from "antd";

import Comments from "./Comments";
import "./onePost.css";
const OnePost = ({ postId }) => {
  useEffect(() => {
    onePost();
    // eslint-disable-next-line 
  }, [postId]);
  const [data, setData] = useState([]);
  const state = useSelector((state) => {
    return state;
  });
  const onePost = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/posts/onePost?postId=${postId}`,
        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      setData(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {data.map((info) => (
        <div key={info._id} className="one-post">
          {/* <h1>{info._id}</h1> */}
          <img
            alt=""
            src={info.img}
            // style={{
            //   width: 240,
            // }}
            className="profile-img"
          />

          <div className="one-post-comment">
            <div className="one-post-user-info">
              <Avatar size={50} src={info.user.avatar} />
              <h4>{info.user.userName}</h4>
              <h3>{info.desc}</h3>
            </div>
            <h4>Comments({info.comments.length})</h4>
            <Comments allPosts={onePost} postId={info._id} />
          </div>
        </div>
      ))}
    </>
  );
};

export default OnePost;
