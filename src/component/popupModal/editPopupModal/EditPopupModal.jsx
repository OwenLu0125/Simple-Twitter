import React, { useState } from "react";
import Popup from "reactjs-popup";
import CloseIcon from "../../../assets/closeIcon.svg";
import UserPhotoIcon from "../../../assets/postPhoto.svg";
import CameraIcon from "../../../assets/camera.svg";
import WhiteCloseIcon from "../../../assets/whiteClose.svg";
import backgroundImage from "../../../assets/backgroundImage.svg";
import "./EditPopupModal.scss";

const EditPopupModal = ({ open, onClose }) => {
  const [username, setUsername] = useState("Chen Tzu-yu");
  const [intro, setIntro] = useState("I am an front-end engineer");
  const [backgroundPhotoFile, setBackgroundPhotoFile] = useState(null);
  const [backgroundPhotoPreview, setBackgroundPhotoPreview] = useState(null);
  const [userPhotoFile, setUserPhotoFile] = useState(null);
  const [userPhotoPreview, setUserPhotoPreview] = useState(null);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleIntroChange = (e) => {
    setIntro(e.target.value);
  };

  const handlePopupClose = () => {
    onClose();
  };

  const handleBackgroundPhotoUpload = (e) => {
    const file = e.target.files[0];
    setBackgroundPhotoFile(file);
    setBackgroundPhotoPreview(URL.createObjectURL(file));
  };

  const handleUserPhotoUpload = (e) => {
    const file = e.target.files[0];
    setUserPhotoFile(file);
    setUserPhotoPreview(URL.createObjectURL(file));
  };

  const handleRemoveBackgroundPhoto = () => {
    setBackgroundPhotoFile(null);
    setBackgroundPhotoPreview(null);
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

  const handleSave = () => {
    // 执行保存操作，例如向服务器发送更新请求
    // 使用新的背景图像、用户头像、名称和自我介绍
    // 可以根据需要自定义保存逻辑
    console.log("保存數據:", {
      username,
      intro,
      backgroundPhotoFile,
      userPhotoFile,
    });

    // 关闭弹出框
    onClose();
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
          <button className="orangeButton" onClick={handleSave}>
            儲存
          </button>
        </div>
        <div className="modalBody">
          <div className="background">
            {backgroundPhotoPreview ? (
              <img
                src={backgroundPhotoPreview}
                alt="background"
                className="backgroundImage"
              />
            ) : (
              <img
                src={backgroundImage} //要帶入使用者原來的backgroundImage
                alt="background"
                className="backgroundImage"
              />
            )}
            <div className="backgroundOverlay">
              <label htmlFor="backgroundPhotoInput">
                <input
                  type="file"
                  id="backgroundPhotoInput"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleBackgroundPhotoUpload}
                />
                <img src={CameraIcon} alt="camera" className="cameraIcon" />
              </label>
              <img
                src={WhiteCloseIcon}
                alt="close"
                className="whiteCloseIcon"
                onClick={handleRemoveBackgroundPhoto}
              />
            </div>
          </div>
          <div className="editUserAvatar">
            {userPhotoPreview ? (
              <img src={userPhotoPreview} alt="avatar" className="avatarIcon" />
            ) : (
              <img src={UserPhotoIcon} alt="avatar" className="avatarIcon" /> //要帶入使用者原來的UserPhotoIcon
            )}
            <div className="editUserAvatarOverlay">
              <label htmlFor="userPhotoInput">
                <input
                  type="file"
                  id="userPhotoInput"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleUserPhotoUpload}
                />
                <img src={CameraIcon} alt="camera" className="cameraIcon" />
              </label>
            </div>
          </div>
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
