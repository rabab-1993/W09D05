import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Avatar } from "antd";
import Slider from "react-slick";
import Comments from "./Comments";
import "./onePost.css";
const OnePost = ({ postId }) => {
  useEffect(() => {
    onePost();
    // eslint-disable-next-line
  }, [postId]);
  const [data, setData] = useState([]);
  const state = useSelector((state) => {
    return state;
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const onePost = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/posts/onePost?postId=${postId}`,
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
  return (
    <>
      {data.map((info) => (
        <div key={info._id} className="one-post">
          {/* <h1>{info._id}</h1> */}
          <Slider {...settings}>
            {info.img.map((item, i) => (
              <img
                key={i}
                alt=""
                src={item}
                // style={{
                //   width: "30px",
                // }}
                // className="profile-img"
              />
            ))}
          </Slider>
          <div className="one-post-comment">
            <div className="one-post-user-info">
              <Avatar size={50} src={info.user.avatar} />
              <h4>{info.user.userName}</h4>
              <h3>{info.desc}</h3>
            </div>
            <h4>Comments({info.comments.length})</h4>
            <Comments allPosts={onePost} postId={info._id} />
          </div>
        </div>
      ))}
    </>
  );
};

export default OnePost;
