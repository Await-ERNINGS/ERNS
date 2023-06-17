import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import Ethan from "./images/Ethan.png";
import Reid from "./images/Reid.png";
import Nicole from "./images/Nicole.png";
import Samira from "./images/Samira.png";
import "./About.css";

export const About = () => {
  return (
    <div className="about-us-page">
      <Header />

      <div className="about-us-content">
        <h1>About Us</h1>
        {/* <img className="img" src={img} alt="img" /> */}

        <section className="testimonials-section">
        <p>Welcome to our page!</p>
          <div className="container">
            
            <ul>
              <li>
                <img src={Ethan} alt="Ethan" />
                <blockquote>
                "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor "
                </blockquote>
                <cite>- Ethan Lee</cite>
              </li>
              <li>
                <img src={Reid} alt="Reid" />
                <blockquote>
                "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor "
                </blockquote>
                <cite>- Reid</cite>
              </li>
              <li>
                <img src={Nicole} alt="Nicole" />
                <blockquote>
                "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor "
                </blockquote>
                <cite>- Nicole Portalatin</cite>
              </li>
              <li>
                <img src={Samira} alt="Samira" />
                <blockquote>
                  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor "
                </blockquote>
                <cite>- Samira Boudjemai</cite>
              </li>
            </ul>
          </div>
        </section>

        {/* 
        {people.map((person, index) => (
          <div key={index} className="person-bio">
            <h2>{person.name}</h2>
            <img src={person.image} alt={person.name} />
            <p>{person.biography}</p>
          </div>
        ))} */}
      </div>

      <Footer />
    </div>
  );
};