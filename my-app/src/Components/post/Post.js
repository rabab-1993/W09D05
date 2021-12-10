import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getPost, newPost } from "../../reducers/post";
import { Uploader, Loader } from "rsuite";
import FileBase from "react-file-base64";
import { FcStackOfPhotos, FcRemoveImage } from "react-icons/fc";
import "./style.css";
const Post = () => {
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
      //   setPost("");
    } catch (error) {
      console.log(error);
    }
    allPosts();
  };

  return (
    <div>
      <h1>post route</h1>

      {(state.postReducer.posts.length &&
        state.postReducer.posts.map((items) => {
          return (
            <div key={items._id}>
              <img src={items.img} alt="img" />
              <h2>{items.desc}</h2>
              {/* <input
                  type="text"
                  name=""
                  id=""
                  placeholder="text"
                  value={task}
                  onChange={(ev) => setTask(ev.target.value)}
                />
                <FcFullTrash onClick={() => deleteTask(items._id)} />
                <FcEditImage onClick={() => UpdateTask(items._id)} /> */}
                <FcRemoveImage />
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
            onDone={({ base64 }) => setPost({...post, img: base64 })} 
            />
          <FcStackOfPhotos />
        <input
          type="text"
          name="desc"
          id=""
          placeholder="text"
          value={post.desc}
          onChange={(ev) => setPost({...post, desc: ev.target.value})}
        />
        <button onClick={addPost}>ADD</button>
      </div>
    </div>
  );
};

export default Post;
