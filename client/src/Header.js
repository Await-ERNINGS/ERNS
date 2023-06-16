import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import logo2 from "./images/logo2.png";

export const Header = (props) => {
  const isLoggedin = props.loggedIn;
  const firstname = props.firstname;
  const location = useLocation(); // Get the current location using useLocation hook

  return (
    <div>
      <header className="header">
        <p>
          <img alt="" src={logo2}></img>
        </p>
        {isLoggedin ? (
          <p style={{ textAlign: "right" }}>Welcome, {firstname}!</p>
        ) : (
          <div className="login-header">
            {location.pathname !== "/dashboard" && (
              <Link to="/login">Login</Link>
            )}
            <br />
            {location.pathname !== "/about" && (
              <Link to="/about">About Us</Link>
            )}
          </div>
        )}
      </header>
    </div>
  );
};
