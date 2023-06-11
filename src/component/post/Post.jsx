import React, { useState } from "react";
import PostPhoto from "../../assets/postPhoto.svg";
import "./Post.scss";

const Post = () => {
  const [postContent, setPostContent] = useState("有什麼新鮮事？");

  const handlePostContentChange = (e) => {
    setPostContent(e.target.value);
  };

  const handlePostContentClick = () => {
    if (postContent === "有什麼新鮮事？") {
      setPostContent("");
    }
  };

  return (
    <div className="postContainer">
      <div className="postHeader">
        <h4 className="medium">首頁</h4>
      </div>
      <hr />
      <div className="postContent">
        <div className="postBox">
          <img src={PostPhoto} alt="User Avatar" className="postAvatar" />
          <div className="postTextContainer">
            <input
              type="text"
              className="postTextInput"
              value={postContent}
              onChange={handlePostContentChange}
              onClick={handlePostContentClick}
            />
          </div>
        </div>
        <button className="button orangeButton">推文</button>
      </div>
      <hr className="thickBar" />
    </div>
  );
};

export default Post;
