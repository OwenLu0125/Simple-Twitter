import React, { useState } from "react";
import PopupModal from "../popupModal/PopupModal";
import PostPhoto from "../../assets/postPhoto.svg";
import "./Post.scss";

const Post = () => {
  const [postContent, setPostContent] = useState("有什麼新鮮事？");
  const [showModal, setShowModal] = useState(false);

  const handlePostContentChange = (e) => {
    setPostContent(e.target.value);
  };

  const handlePostContentClick = () => {
    if (postContent === "有什麼新鮮事？") {
      setPostContent("");
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="postContainer">
      <div className="postHeader">
        <h4 className="medium">首頁</h4>
      </div>
      <hr />
      <div className="postContent">
        <div className="postBox" onClick={handleOpenModal}>
          <img src={PostPhoto} alt="User Avatar" className="userAvatar" />
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
        {/* 點擊推文按鈕後可以新增tweet，等待api串接 */}
        <button className="button orangeButton" onClick={handleOpenModal}>
          推文
        </button>
      </div>
      <hr className="thickBar" />
      {showModal && <PopupModal open={showModal} onClose={handleCloseModal} />}
    </div>
  );
};

export default Post;
