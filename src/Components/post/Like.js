import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const Like = ({ postId, allPosts }) => {
  useEffect(() => {
    allLikes();
    // isLiked()
    // eslint-disable-next-line
  }, []);

  const [data, setData] = useState([]);
  // eslint-disable-next-line
  const state = useSelector((state) => {
    return state;
  });

  const allLikes = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/like?postId=${postId}`,

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
    allLikes();
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
    allLikes();
    allPosts();
  };


  return (
    <>
    
      {/* {data.filter(
        (item) => item.user._id === state.signIn.id && postId === item.post._id
      ).length > 0 ? (
        <AiFillHeart
          className="post-icon"
          onClick={() => removeLikes(item._id)}
        />
      ) : (
        <AiOutlineHeart
          className="post-icon"
          onClick={() => addLikes(postId)}
        />
      )} */}
      
  
      {data.length > 0 ? (
        data.map((item) => (
          <div key={item._id}>
            {item.user._id === state.signIn.id && postId === item.post._id ? (
              <AiFillHeart
                className="post-icon"
                onClick={() => removeLikes(item._id)}
              />
            ) : (
              <AiOutlineHeart
                className="post-icon"
                onClick={() => addLikes(postId)}
              />
              )}
          </div>
        ))
      ) : (
        <AiOutlineHeart
          className="post-icon"
          onClick={() => addLikes(postId)}
        />
      )}
    </>
  );
};

export default Like;
