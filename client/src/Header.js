import React from "react";

export const Header = (props) => {
  const isLoggedin = props.loggedIn;
  const firstname = props.firstname;
  console.log(isLoggedin, firstname);
  return (
    <div>
      <header className="header">
        <p style={{ fontSize: "xx-large" }}>ERN$🐖💰💲💵</p>
        {isLoggedin ? (
          <p style={{ textAlign: "right" }}>Welcome! {firstname}</p>
        ) : (
          <p style={{ textAlign: "right" }}>Login</p>
        )}

        <h1 style={{ textAlign: "center" }}>Welcome to ERN$!</h1>
      </header>
    </div>
  );
};
