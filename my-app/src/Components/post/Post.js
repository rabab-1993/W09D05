import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
const Post = () => {
    const [post, setPost] = useState("");
  const state = useSelector((state) => {
    return state;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    allPosts();
  }, []);

  const allPosts = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/posts`,

        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      const data = {
        tasks: result.data,
      };
      dispatch(getTasks(data));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>post route</h1>
    </div>
  );
};

export default Post;
