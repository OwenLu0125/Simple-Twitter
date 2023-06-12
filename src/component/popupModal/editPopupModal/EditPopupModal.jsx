import React, { useState } from "react";
import Popup from "reactjs-popup";
import CloseIcon from "../../../assets/closeIcon.svg";
import UserPhotoIcon from "../../../assets/postPhoto.svg";
import "./EditPopupModal.scss";

const EditPopupModal = ({ open, onClose }) => {
  const [username, setUsername] = useState("Chen Tzu-yu");
  const [intro, setIntro] = useState("I am an front-end engineer");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleIntroChange = (e) => {
    setIntro(e.target.value);
  };

  const handlePopupClose = () => {
    onClose();
  };

  const popupContentStyle = {
    position: "absolute",
    top: "56px",
    left: "50%",
    width: "634px",
    height: "620px",
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
      <div className="editModal">
        <div className="modalHeader">
          <img src={CloseIcon} alt="close" onClick={handlePopupClose} />
          <h5 className="medium">編輯個人資料</h5>
          <button className="orangeButton">儲存</button>
        </div>
        <div className="modalBody">
          <div className="background" />
          <img src={UserPhotoIcon} alt="avatar" className="editUserAvatar" />
        </div>
        <div className="userContext">
          <div className="nameInputContainer">
            <label htmlFor="nameInput" className="inputLabel nameLabel">
              名稱
            </label>
            <input
              id="nameInput"
              className="nameInput"
              value={username}
              onChange={handleUsernameChange}
              placeholder={username}
            />
            <div className="inputInfo">{username.length}/50</div>
          </div>
          <div className="introInputContainer">
            <label htmlFor="introInput" className="inputLabel introLabel">
              自我介紹
            </label>
            <textarea
              id="introInput"
              className="introInput"
              value={intro}
              onChange={handleIntroChange}
              placeholder={intro}
            />
            <div className="inputInfo">{intro.length}/160</div>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default EditPopupModal;
