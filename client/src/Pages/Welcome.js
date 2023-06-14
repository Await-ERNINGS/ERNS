import React from "react";
import "./Welcome.css";
import Carousel from "../Carousel";

export const Welcome = () => {
  return (
    <div className="title-container">
      <h1 className="welcome">Welcome!</h1>
      <h2>Save today, secure tomorrow!</h2>
      <Carousel />
    </div>
  );
};
