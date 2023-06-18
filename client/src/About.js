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
        <h1 className="aboutus">About Us</h1>
        {/* <img className="img" src={img} alt="img" /> */}

        <section className="testimonials-section">
          <p className="Welcome-message">Welcome to our page!</p>
          <div className="container">
            <ul>
              <li>
                <img src={Ethan} alt="Ethan" />
                <blockquote>
                  "Hello, I'm Ethan, a dedicated and experienced full-stack
                  developer with a background as an Army Reservist. I'm proud to
                  introduce our expense tracking and savings application called
                  ERN$. Designed with the goal of helping individuals manage
                  their finances effectively, our application provides a
                  comprehensive solution for tracking expenses, setting budgets,
                  and saving money. Please enjoy and feel free to reach out to
                  us with any questions!"
                </blockquote>
                <cite>- Ethan Lee</cite>
              </li>
              <li>
                <img src={Reid} alt="Reid" />
                <blockquote>
                  "I am Reid, a proud United States Marine veteran. In the
                  Marines, I learned the importance of persistence and the
                  ability to improvise, adapt, and overcome challenges. These
                  qualities have shaped my approach as a backend engineer and
                  developer for this project. With a Bachelor's Degree in
                  Computer Science from Rutgers University, I bring a strong
                  foundation in coding and a passion for technology. As the
                  backend engineer, I ensure the smooth functioning of the
                  application's infrastructure, data management, and
                  connectivity. Connect with me on LinkedIn and Facebook to stay
                  in touch. I'm always open to engaging with fellow
                  professionals and contributing to the tech community. Together
                  with our talented team, we've created ERN$, a powerful and
                  user-friendly financial management application. I'm here to
                  help you take control of your personal finances and achieve
                  your financial goals. Let's persist, improvise, adapt, and
                  overcome any challenges that come our way."
                </blockquote>
                <cite>- Reid</cite>
              </li>
              <li>
                <img src={Nicole} alt="Nicole" />
                <blockquote>
                  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor "
                </blockquote>
                <cite>- Nicole Portalatin</cite>
              </li>
              <li>
                <img src={Samira} alt="Samira" />
                <blockquote>
                  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor "
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
