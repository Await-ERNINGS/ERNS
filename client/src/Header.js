import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo2 from "./images/logo2.png";

export const Header = (props) => {
  const isLoggedin = props.loggedIn;
  const firstname = props.firstname;
  console.log(isLoggedin, firstname);
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
            <Link to="/login">Login</Link>
          </div>
        )}
      </header>
    </div>
  );
};
