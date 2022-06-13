import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";

const Like = ({ postId, allPosts }) => {
  const state = useSelector((state) => {
    return state;
  });

  const addLikes = async (id) => {
    try {
      // eslint-disable-next-line
      const result = await axios.post(
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
    allPosts();
  };

  const removeLikes = async (id) => {
    try {
      // eslint-disable-next-line
      const result = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/like/remove?likeId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
    allPosts();
  };

  return (
    <>
      {/* {items.likes.user === state.signIn.id ? (
                  <FcLike
                    // key={indx}
                    className="post-icon"
                    // onClick={() => console.log(like._id)}
                    onClick={() => removeLikes(items.likes._id)}
                  />
                ) : (
                  <FcLikePlaceholder
                    // key={indx}
                    className="post-icon"
                    onClick={() => addLikes(items._id)}
                  />
                )} */}

      <FcLike
        // key={indx}
        className="post-icon"
        // onClick={() => console.log(like._id)}
        onClick={() => addLikes(postId)}
      />
    </>
  );
};

export default Like;
