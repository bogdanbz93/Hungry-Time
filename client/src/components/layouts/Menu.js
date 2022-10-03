import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

class Menu extends Component {
  render() {
    return (
      <Fragment>
        {/* Logo */}
        <a href="/" className="navbar-brand">
          {" "}
          <img src={process.env.PUBLIC_URL + "/assets/img/logo.svg"} alt="logo" />{" "}
        </a>
        {/* Menu */}
        <ul className="navbar-nav">
          <li className="menu-item">
            <Link to="/">Acasă</Link>
          </li>
          <li className="menu-item">
            <Link to="/about">Despre noi</Link>
          </li>
          <li className="menu-item menu-item-has-children">
            <Link to="/profile">
              Profilul meu <i className="fas fa-chevron-down ml-2"></i>
            </Link>
            <ul className="submenu">
              <li className="menu-item">
                {" "}
                <Link to="/profile">Informații cont</Link>{" "}
              </li>
              <li className="menu-item">
                {" "}
                <Link to="/profile-listings">Restaurante deținute</Link>{" "}
              </li>
              <li className="menu-item">
                {" "}
                <Link to="/profile-bookings">Rezervările mele</Link>{" "}
              </li>
            </ul>
          </li>
        </ul>
      </Fragment>
    );
  }
}

export default Menu;
