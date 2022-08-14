import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spin, Image, Input, Button, Modal, Avatar } from "antd";
import FileBase from "react-file-base64";
import { FcPlus } from "react-icons/fc";
import { AiOutlineEdit } from "react-icons/ai";
import { GiTrashCan } from "react-icons/gi";
import "./style.css";
import Like from "./Like";
import Comments from "./Comments";

//////////////////////
const Post = () => {
  useEffect(() => {
    if (state.signIn.token) {
      allPosts();
    }
    // allPosts()
    // eslint-disable-next-line
  }, []);
  const [text, setText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [desc, setDesc] = useState("");
  const [imags, setImags] = useState([]);
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState("");
  const state = useSelector((state) => {
    return state;
  });

  let img = [];
  const { TextArea } = Input;
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

      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addPost = async () => {
    try {
      // eslint-disable-next-line
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/posts/post`,
        {
          ...imags,
          desc,
          user: state.signIn.id,
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

  const deletePost = async (id) => {
    try {
      // eslint-disable-next-line
      const result = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/posts/delete?adminId=${state.signIn.id}&_id=${id}`,
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

  const updateText = async (id) => {
    try {
      // eslint-disable-next-line
      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/posts/update`,
        {
          _id: id,
          desc: text,
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
    setEdit(false);
  };

  // for openning a model

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    addPost();
    setIsModalVisible(false);
    // setImags([])
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setImags([]);
  };

  return (
    <div className="post">
      <h1>posts</h1>
      <>
        {(data &&
          data.map((items) => {
            return (
              <div key={items._id} className="post-card">
                <Link to={`/profile/${items.user.userName}`}>
                  <div className="user-info">
                    <Avatar size={40} src={items.user.avatar} />
                    <h4>{items.user.userName}</h4>
                  </div>
                </Link>
                <Image src={items.img} alt="img" />
                {items.user._id === state.signIn.id ? (
                  <GiTrashCan
                    onClick={() => deletePost(items._id)}
                    className="post-icon"
                  />
                ) : (
                  <></>
                )}

                <Like postId={items} allPosts={allPosts} />
                {items.likes.length}

                <div className="description-section">
                  <h3>{items.user.userName}</h3>
                  {edit === items._id ? (
                    <>
                      <TextArea
                        defaultValue={items.desc}
                        onChange={(ev) => setText(ev.target.value)}
                        autoSize
                        className="input"
                      />

                      <Button type="text" onClick={() => updateText(items._id)}>
                        Update
                      </Button>
                      <Button type="text" danger onClick={() => setEdit("")}>
                        Cancel
                      </Button>
                    </>
                  ) : items.user._id === state.signIn.id ? (
                    <p>
                      {items.desc}
                      <AiOutlineEdit
                        className="desc-icon"
                        onClick={() => setEdit(items._id)}
                      />
                    </p>
                  ) : (
                    <p> {items.desc}</p>
                  )}
                </div>

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
          multiple={true}
          onDone={(files) => {
            for (const file of files) {
              img.push(file.base64);
              setImags(img);
            }
          }}
        />
        <Input value={desc} onChange={(ev) => setDesc(ev.target.value)} />
      </Modal>
    </div>
  );
};

export default Post;
