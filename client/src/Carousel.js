import React from "react";
import categorize1 from "./images/categorize1.jpg";
import record2 from "./images/record2.jpg";
import savemoney3 from "./images/savemoney3.jpg";
import { Carousel } from "react-carousel-minimal";

const myCarousel = () => {
  const data = [
    {
      image: categorize1,
      caption: "Set Up and Categorize Expenses!",
    },
    {
      image: record2,
      caption: "Record Expenses Promptly and Accurately !",
    },
    {
      image: savemoney3,
      caption: "Analyze, Review and Save Money !",
    },
  ];

  const captionStyle = {
    fontSize: "2em",
    fontWeight: "bold",
    color: "white",
  };
  const slideNumberStyle = {
    fontSize: "20px",
    fontWeight: "bold",
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          padding: "0 20px",
        }}
      >
        <Carousel
          data={data}
          time={4000}
          width="850px"
          height="500px"
          captionStyle={captionStyle}
          radius="10px"
          slideNumber={true}
          slideNumberStyle={slideNumberStyle}
          captionPosition="top"
          automatic={true}
          dots={true}
          pauseIconColor="white"
          pauseIconSize="40px"
          slideBackgroundColor="darkgrey"
          slideImageFit="cover"
          thumbnails={true}
          thumbnailWidth="100px"
          style={{
            textAlign: "center",
            maxWidth: "850px",
            maxHeight: "200px",
            margin: "40px auto",
          }}
        />
      </div>
    </div>
  );
};

export default myCarousel;
