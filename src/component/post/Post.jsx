import React, { useEffect, useState } from "react";
import PopupModal from "../popupModal/PopupModal";
import { getPostTweet } from "../../api/tweets";
import grayLogo from "../../assets/logoGray.svg";
import "./Post.scss";

const Post = ({ setList }) => {
  //const [postContent, setPostContent] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [userLogo, setUserLogo] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const logo = await getPostTweet();
        setUserLogo(logo);
      } catch (error) {
        console.error("獲取用户Logo失敗:", error);
      }
    };

    fetchData();
  }, []);

  // const handlePostContentChange = (e) => {
  //   setPostContent(e.target.value);
  // };

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
          <img
            src={userLogo ?? grayLogo}
            alt="User Avatar"
            className="userAvatar"
          />
          <div className="postTextContainer">
            <input
              type="text"
              className="postTextInput"
              placeholder={"有什麼新鮮事？"}
            />
          </div>
        </div>
        <button className="button orangeButton" onClick={handleOpenModal}>
          推文
        </button>
      </div>
      <hr className="thickBar" />
      {showModal && (
        <PopupModal
          open={showModal}
          setList={setList}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Post;
