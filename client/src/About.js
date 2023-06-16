import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import Ethan from "./images/Ethan.png";
import Reid from "./images/Reid.png";
import Nicole from "./images/Nicole.png";
import Samira from "./images/Samira.png";

export const About = () => {
  const people = [
    {
      name: "Ethan Lee",
      biography:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum..",
      image: Ethan,
    },
    {
      name: "Reid",
      biography:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image: Reid,
    },
    {
      name: "Nicole Portalatin",
      biography:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image: Nicole,
    },
    {
      name: "Samira Boudjemai",
      biography:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image: Samira,
    },
  ];

  return (
    <div className="about-us-page">
      <Header />

      <div className="about-us-content">
        <h1>About Us</h1>

        {people.map((person, index) => (
          <div key={index} className="person-bio">
            <h2>{person.name}</h2>
            <img src={person.image} alt={person.name} />
            <p>{person.biography}</p>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};
