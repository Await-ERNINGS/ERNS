import React from "react";
import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="text-container">
        <div className="left-content">
          <p>Developed by Ethan, Reid, Nicole, and Samira</p>
        </div>
        <div className="right-content">
          <p>
            &copy; {new Date().getFullYear()} Copyright. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
