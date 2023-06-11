import React, { useState } from "react";
import Popup from "reactjs-popup";
import CloseIcon from "../../assets/closeIcon.svg";
import UserPhotoIcon from "../../assets/postPhoto.svg";
import "./PopupModal.scss";

const PopupModal = ({ open, onClose, onSubmit }) => {
  const [tweetText, setTweetText] = useState("");

  const handleTweetTextChange = (event) => {
    setTweetText(event.target.value);
  };

  const handleTweetSubmit = () => {
    console.log("提交推文:", tweetText);
    setTweetText("");
    onSubmit();
  };

  const handlePopupOpen = () => {
    document.body.classList.add("popupOpened");
  };

  const handlePopupClose = () => {
    document.body.classList.remove("popupOpened");
    onClose();
  };

  return (
    <Popup
      open={open}
      modal
      closeOnDocumentClick
      onClose={handlePopupClose}
      onOpen={handlePopupOpen}
      contentStyle={{
        background: "var(--white)",
        width: "634px",
        height: "300px",
        borderRadius: "14px",
      }}
    >
      <div className="modal">
        <div className="modalHeader">
          <img
            src={CloseIcon}
            alt="close"
            className="closeIcon"
            onClick={handlePopupClose}
          />
        </div>
        <div className="modalBody">
          <img src={UserPhotoIcon} alt="avatar" className="userAvatar" />
          <textarea
            className="tweetInput"
            value={tweetText}
            onChange={handleTweetTextChange}
            placeholder="有什麼新鮮事？"
          />
        </div>
        <div className="modalFooter">
          <button className="tweetButton" onClick={handleTweetSubmit}>
            推文
          </button>
        </div>
      </div>
    </Popup>
  );
};

export default PopupModal;
