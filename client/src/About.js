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
                  saving money, and make better financial decisions. Please
                  enjoy and feel free to reach out to us with any questions!"
                </blockquote>
                <cite>- Ethan Lee</cite>
              </li>
              <li>
                <img src={Reid} alt="Reid" />
                <blockquote>
                  "I'm Reid, a proud Marine veteran who brings the qualities of
                  persistence and adaptability to my role as a backend engineer.
                  With a Computer Science degree from Rutgers University, I'm
                  passionate about technology. As the backend engineer for ERN$,
                  a user-friendly financial management app, I ensure smooth
                  infrastructure, data management, and connectivity. Let's
                  connect on LinkedIn and Facebook to contribute to the tech
                  community and overcome any challenges together."
                </blockquote>
                <cite>- Reid</cite>
              </li>
              <li>
                <img src={Nicole} alt="Nicole" />
                <blockquote>
                  "I'm Nicole, a passionate software engineer specializing in
                  innovative solutions. With a Criminal Justice degree and minor
                  in Computer Science from John Jay college, I proudly introduce
                  ERN$. Our focus: simplicity, functionality, and reliability.
                  Experience a seamless, intuitive app to understand your
                  spending habits and make informed financial decisions. Join me
                  on your confident financial journey. Reach out for any
                  questions or feedback. Let's explore ERN$ together. "
                </blockquote>
                <cite>- Nicole Portalatin</cite>
              </li>
              <li>
                <img src={Samira} alt="Samira" />
                <blockquote>
                  "I am a software engineer with a proven track record of
                  delivering exceptional results. With a strong foundation in
                  computer science and information technology, I possess the
                  skills necessary to excel in designing and developing robust
                  software solutions. Introducing ERN$, our revolutionary
                  expense tracking and savings app. With a user-centric
                  approach, ERN$ empowers individuals to effortlessly manage
                  their finances, track expenses, set budgets, and save money."
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
