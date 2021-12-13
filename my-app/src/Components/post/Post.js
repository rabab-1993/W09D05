import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getPost, newPost, delPost, UpdatePost } from "../../reducers/post";
import { Loader } from "rsuite";
import FileBase from "react-file-base64";
import { FcStackOfPhotos, FcFullTrash, FcLike } from "react-icons/fc";
import "./style.css";
const Post = () => {
  const [text, setText] = useState("");
  const [comment, setComment] = useState("");
  const [post, setPost] = useState({
    img: "",
    desc: "",
  });
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
        posts: result.data,
      };
      dispatch(getPost(data));
      console.log(state);
    } catch (error) {
      console.log(error);
    }
  };

  const addPost = async () => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/posts/post`,
        {
          img: post.img,
          desc: post.desc,
          user: state.signIn.id,
        },
        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );

      dispatch(newPost({ posts: result.data }));
console.log(result.data);
      setPost("");
    } catch (error) {
      console.log(error);
    }
    allPosts();
  };

  const deletePost = async (id) => {
    console.log(state.signIn.token);
    try {
      const result = await axios.delete(
        `${
          process.env.REACT_APP_BASE_URL
        }/posts/delete?isDeleted=${true}&_id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );

      dispatch(delPost(result.data));
    } catch (error) {
      console.log(error);
    }
    allPosts();
  };

  const UpdateTask = async (id) => {
   
    try {
      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/posts/update`,
        {
          desc: text,
          _id: id,
        },

        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );

      dispatch(UpdatePost(result.data));
    } catch (error) {
      console.log(error);
    }
    allPosts();
  };
  const addComment = async (id) => {
  
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/comment/add`,
        { 
          comment: comment , 
          postId: id, 
          userId: state.signIn.id
        },

        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );

      setComment("");
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="post">
      <h1>post route</h1>

      {(state.postReducer.posts.length &&
        state.postReducer.posts.map((items) => {
          return (
            <div key={items._id} className="post-card">
              <img src={items.img} alt="img" />
              <h2>{items.desc}</h2>
              <FcFullTrash
                onClick={() => deletePost(items._id)}
                className="post-icon"
              />
              <FcLike className="post-icon" />
              <input type="text" name="" id="" 
              value={comment.comment}
              placeholder="Add a comment"
               onChange={(ev) => setComment(ev.target.value)}
               />
               <button onClick={() => addComment(items._id)}>Post</button>
            </div>
          );
        })) || (
        <Loader
          size="lg"
          content="loading..."
          inverse
          center
          className="loading-icon"
        />
      )}
      <div>
        <FileBase
          type="file"
          multiple={false}
          onDone={({ base64, base64: string }) =>
            setPost({ ...post, img: base64 })
          }
        />

        <FcStackOfPhotos />
        <input
          type="text"
          name="desc"
          id=""
          placeholder="text"
          value={post.desc}
          onChange={(ev) => setPost({ ...post, desc: ev.target.value })}
        />
        <button onClick={addPost}>ADD</button>
      </div>
    </div>
  );
};

export default Post;
