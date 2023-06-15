import React from "react";

export const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <div>
          <p>Developed by Ethan, Reid, Nicole and Samira</p>
          <div>
            &copy; {new Date().getFullYear()} Your Website. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
