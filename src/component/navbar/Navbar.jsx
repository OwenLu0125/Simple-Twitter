import React, { useState } from "react";
import PopupModal from "../popupModal/PopupModal";
import NavbarLogo from "../../assets/logo.svg";
import NavbarHomeIcon from "../../assets/home.svg";
import NavbarUserIcon from "../../assets/userInfo.svg";
import NavbarSettingIcon from "../../assets/setting.svg";
import "./Navbar.scss";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [tweetText, setTweetText] = useState("");

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleTweetSubmit = () => {
    console.log("提交推文:", tweetText);
    setTweetText("");
  };
  return (
    <div className="navbar">
      <div className="navbarLogo">
        <img src={NavbarLogo} alt="logo" />
      </div>
      <div className="navbarInfo">
        <div className="navbarItem">
          <img src={NavbarHomeIcon} alt="home" />
          <h5 className="medium">首頁</h5>
        </div>
        <div className="navbarItem">
          <img src={NavbarUserIcon} alt="user" />
          <h5 className="medium">個人資料</h5>
        </div>
        <div className="navbarItem">
          <img src={NavbarSettingIcon} alt="setting" />
          <h5 className="medium">設定</h5>
        </div>
        <div className="navbarItem navbarButton" onClick={handleOpenModal}>
          <button>推文</button>
        </div>
      </div>
      <PopupModal
        open={showModal}
        onClose={handleCloseModal}
        onSubmit={handleTweetSubmit}
      />
    </div>
  );
};

export default Navbar;
