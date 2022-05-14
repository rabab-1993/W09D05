import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";

const Like = ({Likes}) => {
  const state = useSelector((state) => {
    return state;
  });

  const allLikes = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/like/profile?_id=${state.signIn.id}`,

        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const addLikes = async (id) => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/like/add`,
        {
            user: state.signIn.id,
            post: id,
        },

        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  
  const removeLikes = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/like/profile?_id=${state.signIn.id}`,

        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };



  return <div>Like</div>;
};

export default Like;
