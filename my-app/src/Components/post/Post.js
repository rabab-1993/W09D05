import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Spin, Image, Input, Button, Modal, Avatar } from "antd";
import { getPost, newPost, delPost, UpdatePost } from "../../reducers/post";
import FileBase from "react-file-base64";
import { FcFullTrash, FcPlus } from "react-icons/fc";
import { AiOutlineEdit } from "react-icons/ai";
import "./style.css";
import Like from "./Like";
import Comments from "./Comments";

//////////////////////
const Post = () => {
  const [text, setText] = useState("");
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
                <Link to={`/profile`}>
                  <div className="user-info">
                    <Avatar size={40} src={items.user.avatar} />
                    <h4>{items.user.userName}</h4>
                  </div>
                </Link>
                <Image src={items.img} alt="img" />
                <FcFullTrash
                  onClick={() => deletePost(items._id)}
                  className="post-icon"
                />

                <Like postId={items._id} allPosts={allPosts} />
                {items.likes.length}

                <h2>
                  Title:{items.desc}
                  <Input
                    value={text.text}
                    onChange={(ev) => setText(ev.target.value)}
                  />
                  <Button onClick={() => updateText(items._id)}>
                    <AiOutlineEdit />
                  </Button>
                </h2>
                <h4>Comments({items.comments.length})</h4>
                <Comments allPosts={allPosts} postId={items._id} />
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
