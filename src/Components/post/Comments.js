import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Input, Button, Avatar } from "antd";
import { FaTimes } from "react-icons/fa";
import { FcCheckmark } from "react-icons/fc";
import { AiOutlineEdit } from "react-icons/ai";
import { GiTrashCan } from "react-icons/gi";

const Comments = ({ allPosts, postId }) => {
  const [comment, setComment] = useState("");
  const [text, setText] = useState("");
  const [editableComment, setEditableComment] = useState("");
  const [coment, setComent] = useState([]);
  const state = useSelector((state) => {
    return state;
  });

  let ids = [];
  // coment.forEach((item) => {
  //   ids.push(item.userId);
  //   ids.push(
  //     <Link
  //       to={`/profile/${item.userId.userName}`}
  //       state={{ userId: item.userId._id }}
  //     >
  //       <Avatar size={30} src={item.userId.avatar} />
  //       <h4>
  //         <b>{item.userId.userName}</b>
  //       </h4>
  //     </Link>
  //   );
  // });
  // console.log(ids);

  useEffect(() => {
    // const getProfile = async () => {
    //   try {
    //     const result = await axios.get(
    //       `${process.env.REACT_APP_BASE_URL}/user/profile?_id=${ids}`,
    //       {
    //         headers: {
    //           Authorization: `Bearer ${state.signIn.token}`,
    //         },
    //       }
    //     );
    //     setUser(result.data);
    //     console.log(result.data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    allComments();
    // getProfile();
    // eslint-disable-next-line
  }, [postId]);

  const allComments = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/comment?postId=${postId}`,

        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );

      setComent(result.data);
      // setIds(result.data.userId);
      // console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const addComment = async (id) => {
    try {
      // eslint-disable-next-line
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/comment/add`,
        {
          comment: comment,
          postId: id,
          userId: state.signIn.id,
        },

        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );

      setComment(" ");
    } catch (error) {
      console.log(error);
    }
    allPosts();
    allComments();
  };

  const updateComment = async (id) => {
    try {
      // eslint-disable-next-line
      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/comment/`,
        {
          comment: text,
          _id: id,
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
    allComments();
    setEditableComment(false);
  };

  const deleteComment = async (id) => {
    try {
      // eslint-disable-next-line
      const result = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/comment?_id=${id}`,

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
    allComments();
  };
  return (
    <>
      {coment.map((item) => {
        return (
          <div key={item._id} className="comment">
             <Link
              to={`/profile/${item.userId.userName}`}
              state={{ userId: item.userId._id }}
            >
              <Avatar size={30} src={item.userId.avatar} />
              <h4>
                <b>{item.userId.userName}</b>
              </h4>
            </Link>
            {/* show the edit input  */}
            <p>
              {item._id === editableComment ? (
                <>
                  <Input
                    defaultValue={item.comment}
                    onChange={(ev) => setText(ev.target.value)}
                    className="input"
                  />
                  <FcCheckmark
                    className="comment-icon"
                    onClick={() => updateComment(item._id)}
                  />
                  <FaTimes
                    className="comment-icon"
                    onClick={() => setEditableComment("")}
                  />
                </>
              ) : item.userId._id === state.signIn.id ? (
                <>
                  {item.comment}
                  <AiOutlineEdit
                    className="edit-icon"
                    onClick={() => setEditableComment(item._id)}
                  />
                  <GiTrashCan
                    className="comment-icon"
                    onClick={() => deleteComment(item._id)}
                  />
                </>
              ) : (
                <>{item.comment}</>
              )}
            </p>
          </div>
        );
      })}
      <Input
        value={comment}
        placeholder="Add a comment"
        style={{
          width: "70%",
        }}
        onChange={(ev) => setComment(ev.target.value)}
      />
      <Button onClick={() => addComment(postId)}>Comment</Button>
    </>
  );
};

export default Comments;
