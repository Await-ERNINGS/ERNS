import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"

export const Header = (props) => {
  const isLoggedin = props.loggedIn;
  const firstname = props.firstname;
  console.log(isLoggedin, firstname);
  return (
    <div>
      <header className="header">
        <p style={{ fontSize: "xx-large" }}>ERN💲🐖💰💵</p>
        {isLoggedin ? (
          <p style={{ textAlign: "right" }}>Welcome, {firstname}!</p>
        ) : (
          <div className="login-header"><Link to="/login">Login</Link></div>
        )}

        
      </header>
    </div>
  );
};
