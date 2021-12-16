import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getPost, newPost, delPost, UpdatePost } from "../../reducers/post";
import { Loader } from "rsuite";
import FileBase from "react-file-base64";
import { FcFullTrash, FcLike, FcPlus } from "react-icons/fc";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { AiOutlineEdit } from "react-icons/ai";
import {
  TextField,
  Button,
  DialogContent,
  DialogActions,
  Dialog,
} from "@mui/material";

import "./style.css";
const Post = () => {
  const [text, setText] = useState("");
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);
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

  const update = async (id) => {
    try {
      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/posts/update`,
        {
       text,
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

      setComment("");
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
    allPosts();
  };
  const handleAddPost = () => {
    addPost();
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="post">
      <h1>posts</h1>
      <Box>
        <ImageList variant="masonry" cols={3} gap={8}>
          {(state.postReducer.posts.length &&
            state.postReducer.posts.map((items) => {
              return (
                <ImageListItem key={items._id} className="post-card">
                  <img src={items.img} alt="img" />
                  <FcFullTrash
                    onClick={() => deletePost(items._id)}
                    className="post-icon"
                  />
                  <FcLike className="post-icon" />
                  <h2>
                    {" "}
                    Title:{items.desc}
                    <TextField
                      autoFocus
                      margin="dense"
                      id=""
                      name=""
                      label="Add Description"
                      type="text"
                      variant="standard"
                      value={text.text}
                      onChange={(ev) => setText(ev.target.value)}
                    />
                    <Button onClick={update}>Edit</Button>
                  </h2>
                  <input
                    type="text"
                    name=""
                    id=""
                    value={comment.comment}
                    placeholder="Add a comment"
                    onChange={(ev) => setComment(ev.target.value)}
                  />
                  <button onClick={() => addComment(items._id)}>Post</button>
                </ImageListItem>
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
        </ImageList>
      </Box>
      <FcPlus className="add" onClick={handleClickOpen} />
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64, base64: string }) =>
              setPost({ ...post, img: base64 })
            }
          />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="desc"
            label="Add Description"
            type="text"
            fullWidth
            variant="standard"
            value={post.desc}
            onChange={(ev) => setPost({ ...post, desc: ev.target.value })}
          />
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleAddPost}>ADD</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Post;
