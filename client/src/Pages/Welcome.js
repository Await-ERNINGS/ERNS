import React from "react";
import "./Welcome.css";
import Carousel from "../Carousel";
import { Header } from "../Header";
import { Footer } from "../Footer";

export const Welcome = () => {
  return (
    <>
      <Header />
      <div className="title-container">
        <h1>Welcome to ERN$!</h1>
        <h2>Save Today, Secure Tomorrow!</h2>
        <Carousel />
      </div>
      <Footer />
    </>
  );
};
