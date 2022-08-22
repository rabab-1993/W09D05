import React from "react";
import Nav from "../header/Nav";
import Post from "../post/Post";

function Home() {
  return (
    <>
      <div className="home">
        <Nav />
        <Post />
      </div>
    </>
  );
}

export default Home;
