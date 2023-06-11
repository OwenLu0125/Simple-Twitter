import React, { useState } from "react";
import Popup from "reactjs-popup";
import CloseIcon from "../../assets/closeIcon.svg";
import UserPhotoIcon from "../../assets/postPhoto.svg";
import "./PopupModal.scss";

const PopupModal = ({ open, onClose }) => {
  const [tweetText, setTweetText] = useState("");

  const handleTweetTextChange = ({ target: { value } }) => {
    setTweetText(value);
  };

  const handlePopupClose = () => {
    setTweetText("");
    onClose();
  };

  const popupContentStyle = {
    position: "absolute",
    top: "56px",
    left: "50%",
    width: "634px",
    height: "300px",
    borderRadius: "14px",
    background: "var(--white)",
    transform: "translateX(-50%)",
  };

  const overlayStyle = {
    background: "rgba(0, 0, 0, 0.5)",
  };

  return (
    <Popup
      open={open}
      modal
      closeOnDocumentClick
      onClose={handlePopupClose}
      contentStyle={popupContentStyle}
      overlayStyle={overlayStyle}
    >
      <div className="modal">
        <div className="modalHeader">
          <img src={CloseIcon} alt="close" onClick={handlePopupClose} />
        </div>
        <hr />
        <div className="modalBody">
          <img src={UserPhotoIcon} alt="avatar" className="userAvatar" />
          <input
            className="tweetInput"
            value={tweetText}
            onChange={handleTweetTextChange}
            placeholder="有什麼新鮮事？"
          />
        </div>
        <div className="modalFooter">
          <button className="orangeButton" onClick={handlePopupClose}>
            推文
          </button>
        </div>
      </div>
    </Popup>
  );
};

export default PopupModal;
