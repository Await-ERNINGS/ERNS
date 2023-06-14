import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle sign-up logic here
    // e.g., send data to server or perform client-side validation
    // You can use the values of username, email, and password in this function
  };

  return (
    <div className="signup-form">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <button type="submit">Sign Up</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </div>
  );
};


