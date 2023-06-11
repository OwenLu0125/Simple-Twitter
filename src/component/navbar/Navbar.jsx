import React, { useState } from "react";
import PopupModal from "../popupModal/PopupModal";
import NavbarItem from "./navItems/NavItems";
import { useLocation } from "react-router-dom";
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
    icon: {
      default: NavbarHomeIcon,
      active: NavbarHomeIconActive,
    },
    text: "首頁",
  },
  {
    path: "user/self",
    icon: {
      default: NavbarUserIcon,
      active: NavbarUserIconActive,
    },
    text: "個人資料",
  },
  {
    path: "settings",
    icon: {
      default: NavbarSettingIcon,
      active: NavbarSettingIconActive,
    },
    text: "設定",
  },
];

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const { pathname } = location;
  const [activeItem, setActiveItem] = useState(pathname.substring(1));

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className="navbar">
      <div className="navbarLogo">
        <img src={NavbarLogo} alt="logo" />
      </div>
      <div className="navbarInfo">
        {navItems.map(({ path, icon, text }) => (
          <NavbarItem
            key={path}
            path={path}
            icon={icon.default}
            activeIcon={icon.active}
            text={text}
            isActive={activeItem === path}
            onClick={handleItemClick}
          />
        ))}
        <div className="navbarItem navbarButton" onClick={handleOpenModal}>
          <button>推文</button>
        </div>
      </div>
      <PopupModal
        open={showModal}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Navbar;