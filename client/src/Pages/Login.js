import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    // Perform login logic or API call
  };

  return (
    <>
      <h1>Login</h1>
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <div className="input">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
            />
            <br />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <br />
          <button type="submit">Login</button>
          <br />
        <Link className="Signup" to="/signup">Create an account</Link>
        </form>
      </div>
    </>
  );
};
