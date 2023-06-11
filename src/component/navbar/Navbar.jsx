import React, { useState } from "react";
import PopupModal from "../popupModal/PopupModal";
import { NavLink, useLocation } from "react-router-dom";
import NavbarLogo from "../../assets/logo.svg";
import NavbarHomeIcon from "../../assets/home.svg";
import NavbarHomeIconActive from "../../assets/homeActive.svg";
import NavbarUserIcon from "../../assets/userInfo.svg";
import NavbarUserIconActive from "../../assets/userInfoActive.svg";
import NavbarSettingIcon from "../../assets/setting.svg";
import NavbarSettingIconActive from "../../assets/settingActive.svg";
import "./Navbar.scss";

const navItems = [
  {
    path: "mainPage",
    icon: NavbarHomeIcon,
    activeIcon: NavbarHomeIconActive,
    text: "首頁",
  },
  {
    path: "user/self",
    icon: NavbarUserIcon,
    activeIcon: NavbarUserIconActive,
    text: "個人資料",
  },
  {
    path: "settings",
    icon: NavbarSettingIcon,
    activeIcon: NavbarSettingIconActive,
    text: "設定",
  },
];

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
  const location = useLocation();
  const { pathname } = location;
  const [activeItem, setActiveItem] = useState(pathname.substring(1));

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className="navbar">
      <div className="navbarLogo">
        <img src={NavbarLogo} alt="logo" />
      </div>
      <div className="navbarInfo">
        {navItems.map(({ path, icon, activeIcon, text }) => (
          <NavLink
            exact={true.toString()}
            to={`/${path}`}
            key={path}
            className={`navbarItem ${activeItem === path ? "active" : ""}`}
            activeClassName="active"
            onClick={() => handleItemClick(path)}
          >
            <img src={activeItem === path ? activeIcon : icon} alt={path} />
            <h5 className="medium">{text}</h5>
          </NavLink>
        ))}
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
