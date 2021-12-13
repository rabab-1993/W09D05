import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { getPost, newPost, delPost } from "../../reducers/post";
import Nav from "../header/Nav";
import { FcStackOfPhotos, FcFullTrash, FcLike } from "react-icons/fc";
import "./style.css";

const Profile = () => {
  const [post, setPost] = useState({
    img: "",
    desc: "",
  });
  useEffect(() => {
    allPosts();
  }, []);
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state;
  });

  const allPosts = async (id) => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/posts/profile?user=${state.signIn.id}`,

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

      //   setPost("");
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


  return (
      <>
      <Nav />
    <div className="profile">
      <h1>profile page</h1>
      {!state.postReducer.posts.length ? <h1 className="loading-icon">You don't have any post</h1> :
        state.postReducer.posts.map((items) => {
          { console.log(items)}
          return (
            <div key={items._id} className="post-card">

              <img src={items.img} alt="img" />
              <h2>{items.desc}</h2>
              <FcFullTrash onClick={() => deletePost(items._id)} className="post-icon"/>
              <FcLike className="post-icon"/>
            </div>
          );
        }) || (
       <h1 className="loading-icon">loading ....</h1>
      )}
      <div>
      <FileBase
        type="file"
        multiple={false}
        onDone={({ base64, base64: string  }) =>
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
    </>
  )
  
};

export default Profile;
