import React from "react";
import { NavLink } from "react-router-dom";
import "../Navbar.scss";

const NavbarItem = ({ path, icon, activeIcon, text, isActive, onClick }) => {
  const Icon = isActive ? activeIcon : icon;

  return (
    <NavLink
      exact
      to={`/${path}`}
      className={`navbarItem ${isActive ? "active" : ""}`}
      activeClassName="active"
      onClick={() => onClick(path)}
    >
      <img src={Icon} alt={path} />
      <h5 className="medium">{text}</h5>
    </NavLink>
  );
};

export default NavbarItem;
