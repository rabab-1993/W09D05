import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Spin, Image, Input, Button, Modal } from "antd";
import { getPost, newPost, delPost, UpdatePost } from "../../reducers/post";
import FileBase from "react-file-base64";
import { FcFullTrash, FcLike, FcPlus, FcLikePlaceholder } from "react-icons/fc";
import { AiOutlineEdit } from "react-icons/ai";
import "./style.css";

//////////////////////
const Post = () => {
  const [text, setText] = useState("");
  const [comment, setComment] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
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
    // eslint-disable-next-line
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
        `${process.env.REACT_APP_BASE_URL}/posts/delete?adminId=${state.signIn.id}&_id=${id}`,
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

  const updateText = async (id) => {
    console.log(id);
    try {
      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/posts/update?desc=${text}&_id=${id}`,
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

  const addLikes = async (id) => {
    try {
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

  // for openning a model

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    addPost();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="post">
      <h1>posts</h1>
      <>
        {(state.postReducer.posts.length &&
          state.postReducer.posts.map((items) => {
            {
              console.log(items);
            }
            return (
              <div key={items._id} className="post-card">
                <Image src={items.img} alt="img" />
                <FcFullTrash
                  onClick={() => deletePost(items._id)}
                  className="post-icon"
                />
                {items.likes.user === state.signIn.id ? (
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
                )}
                {/* {items.likes.map((like, indx) => {
                  {console.log(like.user)}
                  like.user === state.signIn.id ? (
                    <FcLike
                      className="post-icon"
                      onClick={() => removeLikes(like._id)}
                    />
                  ) : (
                    <FcLikePlaceholder
                      className="post-icon"
                      onClick={() => addLikes(items._id)}
                    />
                  )
                })} */}

                {items.likes.length}

                <h2>
                  {" "}
                  Title:{items.desc}
                  <Input
                    value={text.text}
                    onChange={(ev) => setText(ev.target.value)}
                  />
                  <Button onClick={() => updateText(items._id)}>
                    <AiOutlineEdit />
                  </Button>
                </h2>
                <Input
                  value={comment.comment}
                  placeholder="Add a comment"
                  onChange={(ev) => setComment(ev.target.value)}
                />
                <Button onClick={() => addComment(items._id)}>Post</Button>
              </div>
            );
          })) || <Spin size="large" />}
      </>
      <FcPlus className="add" onClick={showModal} />
      <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <FileBase
          type="file"
          multiple={false}
          onDone={({ base64, base64: string }) =>
            setPost({ ...post, img: base64 })
          }
        />

        <Input
          value={post.desc}
          onChange={(ev) => setPost({ ...post, desc: ev.target.value })}
        />
      </Modal>
    </div>
  );
};

export default Post;
