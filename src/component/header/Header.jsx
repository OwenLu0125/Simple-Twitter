import React from "react";
import { Link } from "react-router-dom";
import arrowIcon from "../../assets/arrow.svg";
import "./Header.scss";

const Header = ({ username, tweetCount }) => {
  return (
    <header className="header">
      <Link to="/mainPage" className="backButton">
        <img src={arrowIcon} alt="arrow icon" />
      </Link>
      <div className="userInfo">
        <h5 className="medium">{username}</h5>
        <div className="tweetCount">{tweetCount} 推文</div>
      </div>
    </header>
  );
};

export default Header;
