import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Spin,
  Image,
  Input,
  Button,
  Modal,
  Avatar,
  message,
  Divider,
} from "antd";
import Slider from "react-slick";
import FileBase from "react-file-base64";
import { FcPlus } from "react-icons/fc";
import { AiOutlineEdit } from "react-icons/ai";
import { GiTrashCan } from "react-icons/gi";
import Like from "./Like";
import Comments from "./Comments";

import "./style.css";

//////////////////////
const Post = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!state.signIn.token) {
      navigate("/login", { replace: true });
    } else {
      navigate("/posts");
      allPosts();
    }
    // eslint-disable-next-line
  }, []);
  const [text, setText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [desc, setDesc] = useState("");
  const [imags, setImags] = useState([]);
  const [data, setData] = useState([]);
  // eslint-disable-next-line
  const [userInfo, setUserInfo] = useState([]);
  const [edit, setEdit] = useState("");
  const state = useSelector((state) => {
    return state;
  });

  let img = [];
  const { TextArea } = Input;
  //  for convert images to Base64
  // const getBase64 = (files) => {
  //   const f = Array.from(files)
  //   f.forEach(file => {
  //     new Promise((resolve, reject) => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file);

  //       reader.onload = () => resolve(setImags(oldImg => [...oldImg, reader.result]));

  //       reader.onerror = (error) => reject(error);
  //     });
  //   });
  // }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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
      setUserInfo(result.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const addPost = async () => {
    try {
      message.loading("it's posting");
      // eslint-disable-next-line
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/posts/add`,
        {
          imags,
          desc,
          user: state.signIn.id,
        },
        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      message.success("Posted");
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
    setImags(img);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setImags([]);
  };
  return (
    <div className="post">
      {data.map((items) => {
        return (
          <div key={items._id} className="post-card">
            {/* {userInfo.map((info) => (
                <Link
                  to={`/profile/${info.userName}`}
                  state={{ userId: info._id }}
                >
                  <div className="user-info">
                    <Avatar size={50} src={info.avatar} />
                    <h4>{items.user.userName}</h4>
                  </div>
                </Link>
              ))} */}
            <Link
              to={`/profile/${items.user.userName}`}
              state={{ userId: items.user._id }}
            >
              <div className="user-info">
                <Avatar size={50} src={items.user.avatar} />
                <h4>{items.user.userName}</h4>
              </div>
            </Link>
            <Slider {...settings}>
              {items.img.map((image, i) => (
                <Image key={i} src={image} alt="img" />
              ))}
            </Slider>
            <Divider />
            <div className="like-section">
              {items.user._id === state.signIn.id ? (
                <GiTrashCan
                  onClick={() => deletePost(items._id)}
                  className="post-icon"
                />
              ) : (
                <></>
              )}
              <Like postId={items._id} allPosts={allPosts} />
              {items.likes.length}
            </div>
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
      }) || <Spin size="large" />}

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
        {/* <input type="file" name="" id="" multiple onChange={(ev) => getBase64(ev.target.files)}/> */}
        <Input value={desc} onChange={(ev) => setDesc(ev.target.value)} />
      </Modal>
    </div>
  );
};

export default Post;
