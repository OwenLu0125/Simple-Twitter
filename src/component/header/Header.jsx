import React from "react";
import { useNavigate } from "react-router-dom";
import arrowIcon from "../../assets/arrow.svg";
import "./Header.scss";

const Header = ({ username, tweetCount, pageName }) => {
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    if (pageName) {
      navigate(`/${pageName}`);
    } else {
      navigate("/mainPage");
    }
  };
  return (
    <header className="header">
      <button className="backButton" onClick={handleBackButtonClick}>
        <img src={arrowIcon} alt="arrow icon" />
      </button>
      <div className="userInfo">
        <h5 className="medium">{username}</h5>
        <div className="tweetCount">{tweetCount} 推文</div>
      </div>
    </header>
  );
};

export default Header;
