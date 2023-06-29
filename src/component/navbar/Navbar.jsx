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
import NavbarLogoutIcon from "../../assets/logout.svg";
import { useAuth } from "../../contexts/AuthContext";
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

const adminNavItems = [
  {
    path: "admin_main",
    icon: {
      default: NavbarHomeIcon,
      active: NavbarHomeIconActive,
    },
    text: "推文清單",
  },
  {
    path: "admin_users",
    icon: {
      default: NavbarUserIcon,
      active: NavbarUserIconActive,
    },
    text: "使用者列表",
  },
];

const Navbar = ({ setList, setTweetsList }) => {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const { pathname } = location;
  const [activeItem, setActiveItem] = useState(pathname.substring(1));
  const { logout } = useAuth();

  const handleClick = () => {
    logout();
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const loopMenuItems = activeItem.includes("admin") ? adminNavItems : navItems;

  return (
    <div className="navbar">
      <div className="navbarLogo">
        <img src={NavbarLogo} alt="logo" />
      </div>
      <div className="navbarInfo">
        {loopMenuItems.map(({ path, icon, text }) => (
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
      </div>
      {activeItem.includes("admin") ? null : (
        <div className="navbarItem navbarButton" onClick={handleOpenModal}>
          <button>推文</button>
        </div>
      )}
      {showModal && (
        <PopupModal
          open={showModal}
          setList={setList}
          onClose={handleCloseModal}
          setTweetsList={setTweetsList}
        />
      )}
      <div className="logoutBtn">
        <img src={NavbarLogoutIcon} alt="logout icon" />
        <h5 className="medium" onClick={handleClick}>
          登出
        </h5>
      </div>
    </div>
  );
};

export default Navbar;
