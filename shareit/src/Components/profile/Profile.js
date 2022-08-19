import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import FileBase from "react-file-base64";
import { Avatar, Col, Row, Tabs, Modal, Input } from "antd";
import { FcStackOfPhotos } from "react-icons/fc";
import { GiTrashCan } from "react-icons/gi";
import { AiOutlineEye } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import { FcCheckmark } from "react-icons/fc";
import { CgLoadbarDoc } from "react-icons/cg";
import { AiOutlineEdit } from "react-icons/ai";
import Nav from "../header/Nav";
import OnePost from "../post/OnePost";

import "./style.css";

const Profile = () => {
  useEffect(() => {
    allPosts();
    getProfile();
    // eslint-disable-next-line
  }, []);
  const location = useLocation();
  const [avatar, setAvatar] = useState(null);
  const [userName, setUserName] = useState();
  const [postId, setPostId] = useState("");
  const [data, setData] = useState([]);
  const [info, setInfo] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editUserName, setEditUserName] = useState(false);
  const [editAvatar, setEditAvatar] = useState(false);
  const state = useSelector((state) => {
    return state;
  });

  const showModal = (id) => {
    setIsModalVisible(true);
    setPostId(id);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setPostId(" ");
  };

  const getProfile = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user/profile?_id=${location.state.userId}`,
        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      setInfo(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfile = async () => {
    try {
      // eslint-disable-next-line
      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/user/update`,
        {
          userName: userName,
          avatar,
          _id: state.signIn.id,
        },
        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      console.log(result.data);
      setEditUserName(false);
      setEditAvatar(false);
    } catch (error) {
      console.log(error);
    }
    getProfile();
  };
  // get all user posts
  const allPosts = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/posts/onePost?userId=${location.state.userId}`,
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

  const deletePost = async (id) => {
    try {
      // eslint-disable-next-line
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
    } catch (error) {
      console.log(error);
    }
    allPosts();
  };

  return (
    <>
      <Nav />
      <div className="profile">
        <h1>profile page</h1>
        {info.map((item) => (
          <div key={item._id} className="profile-info">
            <Avatar
              size={{ xs: 80, sm: 32, md: 40, lg: 64, xl: 150, xxl: 100 }}
              src={item.avatar}
            />

            {editUserName ? (
              <>
                <Input
                  defaultValue={item.userName}
                  onChange={(ev) => setUserName(ev.target.value)}
                  className="input"
                />
                <FcCheckmark
                  className="comment-icon"
                  onClick={() => updateProfile()}
                />
                <FaTimes
                  className="comment-icon"
                  onClick={() => setEditUserName(false)}
                />
              </>
            ) : item._id === state.signIn.id ? (
              <>
                <FcStackOfPhotos
                  onClick={() => setEditAvatar(true)}
                  className="avatar"
                />
                <h1>
                  {item.userName}
                  <AiOutlineEdit
                    className="edit-icon"
                    onClick={() => setEditUserName(true)}
                  />
                </h1>
              </>
            ) : (
              <>
                <h1>{item.userName}</h1>
              </>
            )}
          </div>
        ))}
        {/* Show Modal for Editing Profile  */}
        <Modal
          title="Change Avatar"
          visible={editAvatar}
          onOk={() => updateProfile()}
          onCancel={() => setEditAvatar(false)}
        >
          <FileBase
            type="file"
            multiple={false}
            onDone={(file) => setAvatar(file.base64)}
          />
        </Modal>
        <Tabs defaultActiveKey="1" centered className="profile-posts">
          <Tabs.TabPane
            tab={
              <span>
                <CgLoadbarDoc />
                Posts
              </span>
            }
            key="1"
          >
            <Row gutter={16}>
              {data.map((info) => (
                <Col key={info._id}>
                  <img alt="" src={info.img} className="profile-img" />
                  <div className="preview">
                    {info.user._id === state.signIn.id ? (
                      <GiTrashCan
                        style={{ fontSize: "1.7em", marginRight: "0.5rem" }}
                        onClick={() => deletePost(info._id)}
                      />
                    ) : (
                      <></>
                    )}
                    <AiOutlineEye fontSize="20" />
                    <span onClick={() => showModal(info._id)}>preview</span>
                  </div>
                </Col>
              ))}
            </Row>
          </Tabs.TabPane>
        </Tabs>
        <Modal
          // visible={true}
          visible={isModalVisible}
          footer={null}
          onCancel={handleCancel}
          width="fit-content"
        >
          <OnePost postId={postId} />
        </Modal>
      </div>
    </>
  );
};

export default Profile;
