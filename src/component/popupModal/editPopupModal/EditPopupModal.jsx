import React, { useState } from "react";
import Popup from "reactjs-popup";
import CloseIcon from "../../../assets/closeIcon.svg";
import CameraIcon from "../../../assets/camera.svg";
import WhiteCloseIcon from "../../../assets/whiteClose.svg";
import "./EditPopupModal.scss";
import { updateUser } from "../../../api/popupEditModal";

const EditPopupModal = ({ open, onClose, userData, onUserDataUpdate }) => {
  const [username, setUsername] = useState(userData.user.name || "");
  const [intro, setIntro] = useState(userData.user.introduction || "");
  const [backgroundPhotoFile, setBackgroundPhotoFile] = useState(null);
  const [backgroundPhotoPreview, setBackgroundPhotoPreview] = useState(null);
  const [userPhotoFile, setUserPhotoFile] = useState(null);
  const [userPhotoPreview, setUserPhotoPreview] = useState(null);
  const [errorMessageUsername, setErrorMessageUsername] = useState(null);
  const [errorMessageIntro, setErrorMessageIntro] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState({});

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

  const handleUsernameChange = (e) => {
    const updatedName = e.target.value;
    setUsername(updatedName);
    setErrorMessageUsername(null);

    const updatedData = {
      ...updatedUserData,
      name: updatedName,
    };
    setUpdatedUserData(updatedData);
  };

  const handleIntroChange = (e) => {
    const updatedIntro = e.target.value;
    setIntro(updatedIntro);
    setErrorMessageIntro(null);

    const updatedData = {
      ...updatedUserData,
      introduction: updatedIntro,
    };
    setUpdatedUserData(updatedData);
  };

  const handleSave = () => {
    if (username.length > 50 && intro.length > 160) {
      setErrorMessageUsername("字數超出上限!");
      setErrorMessageIntro("字數超出上限!");
      return;
    } else if (username.length > 50) {
      setErrorMessageUsername("字數超出上限!");
      setErrorMessageIntro(null);
      return;
    } else if (intro.length > 160) {
      setErrorMessageIntro("字數超出上限!");
      setErrorMessageUsername(null);
      return;
    }

    if (Object.keys(updatedUserData).length === 0) {
      onClose();
      return;
    }

    const updatedData = { ...userData.user, ...updatedUserData };

    updateUser(userData.user.id, updatedData)
      .then((response) => {
        console.log("用户信息更新成功:", response);
        onUserDataUpdate(updatedData);
      })
      .catch((error) => {
        console.error("用户信息更新失败:", error);
      });
    onClose();
  };

  const popupContentStyle = {
    position: "absolute",
    top: "56px",
    left: "50%",
    width: "634px",
    height: "650px",
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
          <img
            src={CloseIcon}
            alt="close"
            className="close"
            onClick={handlePopupClose}
          />
          <h5 className="medium">編輯個人資料</h5>
          <button type="submit" className="orangeButton" onClick={handleSave}>
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
                src={userData.user.banner}
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
              <img
                src={userData.user.avatar}
                alt="avatar"
                className="avatarIcon"
              />
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
              placeholder={userData.user.name || ""}
            />
            <div className="inputInfo">{username.length}/50</div>
          </div>
          {errorMessageUsername && (
            <div className="errorMessage">{errorMessageUsername}</div>
          )}
          <div className="introInputContainer">
            <label htmlFor="introInput" className="inputLabel introLabel">
              自我介紹
            </label>
            <textarea
              id="introInput"
              className="introInput"
              value={intro}
              onChange={handleIntroChange}
              placeholder={userData.user.introduction || ""} //要帶入使用者自介
            />
            <div className="inputInfo">{intro.length}/160</div>
          </div>
          {errorMessageIntro && (
            <div className="errorMessage">{errorMessageIntro}</div>
          )}
        </div>
      </div>
    </Popup>
  );
};

export default EditPopupModal;
