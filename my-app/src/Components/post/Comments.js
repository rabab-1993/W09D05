import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Input, Button, Avatar } from "antd";
import { FaTimes } from "react-icons/fa";

const Comments = ({ allPosts, postId }) => {
  useEffect(() => {
    allComments();
    // eslint-disable-next-line
  }, []);

  const [comment, setComment] = useState("");
  const [coment, setComent] = useState([]);
  const state = useSelector((state) => {
    return state;
  });

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
    } catch (error) {
      console.log(error);
    }
  };
  console.log(coment);
  const addComment = async (id) => {
    try {
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

  const deleteComment = async (id) => {
    try {
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
      {coment.map((comment) => {
        return (
          <div key={comment._id} className="comment">
            <Avatar size={30} src={comment.userId.avatar} />
            <h4>
              <b>{comment.userId.userName}</b> {comment.comment}
            </h4>
            {comment.userId._id === state.signIn.id ? (
              <FaTimes
                className="comment-icon"
                onClick={() => deleteComment(comment._id)}
              />
            ) : (
              <></>
            )}
          </div>
        );
      })}
      <Input
        value={comment}
        placeholder="Add a comment"
        style={{
            width: 375,
          }}
        onChange={(ev) => setComment(ev.target.value)}
      />
      <Button onClick={() => addComment(postId)}>Post</Button>
    </>
  );
};

export default Comments;
