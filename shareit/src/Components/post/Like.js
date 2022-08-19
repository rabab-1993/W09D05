import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";

const Like = ({ postId, allPosts }) => {
  useEffect(() => {
    allLikes();
    // isLiked()
    // eslint-disable-next-line
  }, []);

  const [data, setData] = useState([]);
    // eslint-disable-next-line
  const [isLike, setIsLike] = useState(false);
  const state = useSelector((state) => {
    return state;
  });

  // const isLiked = () => {
  //   data.map(like => {
  //     if (like.user._id === state.signIn.id) {
  //      return setIsLike(true)
  //     } else {
  //      return setIsLike(false)

  //     }
  // })

  // }

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

      // console.log(result.data);
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
      // console.log(result.201);
      setIsLike(true);
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
      setIsLike(false);
    } catch (error) {
      console.log(error);
    }
    allPosts();
  };
  console.log(data);
  // const liked = () => {
  //   data.map((item) => (
  //     <div key={item._id}>
  //       {console.log(item.user._id)}
  //       {isLike ? (
  //         <FcLikePlaceholder
  //           // key={indx}
  //           className="post-icon"
  //           onClick={() => addLikes(postId)}
  //         />
  //       ) : (
  //         <FcLike
  //           // key={indx}
  //           className="post-icon"
  //           // onClick={() => console.log(like._id)}
  //           onClick={() => removeLikes(item._id)}
  //         />
  //       )}
  //     </div>
  //   ));
  // };
  return (
    <>
            {/* {isLike ? (
               <FcLikePlaceholder
               className="post-icon"
               onClick={() => addLikes(postId)}
             />
          
        ) : (
          <FcLike
          className="post-icon"
          // onClick={() => removeLikes(item._id)}
        />
        )} */}

      {data.map((item) => {
       return (
        <div key={item._id}>
        {console.log(item.user._id)}
        {item.user._id !== state.signIn.id  ? (
          <FcLike
            className="post-icon"
            onClick={() => removeLikes(item._id)}
          />
        ) : (
          <FcLikePlaceholder
            className="post-icon"
            onClick={() => addLikes(postId)}
          />
        )}
      </div>
       )
       })}


      {/*       
      <FcLike
        className="post-icon"
        onClick={() => addLikes(postId)}
      /> */}
    </>
  );
};

export default Like;
