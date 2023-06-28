import React, { useState } from "react";
import home from "../../assets/home.svg";
import tweet from "../../assets/tweet-mobile.svg";
import profile from "../../assets/userInfo.svg";
import setting from "../../assets/setting.svg";
import homeActive from "../../assets/homeActive.svg";
import userInfoActive from "../../assets/userInfoActive.svg";
import settingActive from "../../assets/settingActive.svg";
import "./MobileMenu.scss";

const MobileMenu = () => {
  const [currentPage, setCurrentPage] = useState("home");

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="mobileMenuContainer">
      <div className="menuIcon" onClick={() => handlePageChange("home")}>
        <img src={currentPage === "home" ? homeActive : home} alt="home icon" />
      </div>
      <div className="menuIcon">
        <img src={tweet} alt="tweet icon" />
      </div>
      <div className="menuIcon" onClick={() => handlePageChange("profile")}>
        <img
          src={currentPage === "profile" ? userInfoActive : profile}
          alt="profile icon"
        />
      </div>
      <div className="menuIcon" onClick={() => handlePageChange("setting")}>
        <img
          src={currentPage === "setting" ? settingActive : setting}
          alt="setting icon"
        />
      </div>
    </div>
  );
};

export default MobileMenu;
