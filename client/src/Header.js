import React from "react";
import { Link, useLocation } from "react-router-dom";

import "./Header.css";
import logo2 from "./images/logo2.png";

export const Header = (props) => {
  const isLoggedin = props.loggedIn;
  const firstname = props.firstname;
  const location = useLocation();

  return (
    <div>
      <header className="header">
        <p>
          <img alt="" src={logo2}></img>
        </p>
        {isLoggedin ? (
          <>
            <p style={{ textAlign: "right" }}>Welcome, {firstname}!</p>
            {location.pathname !== "/" && (
              <Link to="/" className="home-link">
                Home
              </Link>
            )}
          </>
        ) : (
          <div className="login-header">
            {location.pathname !== "/" &&
              location.pathname !== "/login" &&
              location.pathname !== "/about" && (
                <Link to="/dashboard">Dashboard</Link>
                )}
            {location.pathname !== "/" &&
              location.pathname !== "/login" &&
              location.pathname !== "/about" && (
                <Link to="/expense">Expenses</Link>
                )}
            <Link to="/">Home</Link>
            <br />
            {location.pathname !== "/about" && (
              <Link to="/about">About</Link>
              )}
              {location.pathname !== "/login" &&
                location.pathname !== "/dashboard" &&
                location.pathname !== "/expense" && (
                  <Link to="/login">Login</Link>
                )}

          </div>
        )}
      </header>
    </div>
  );
};
