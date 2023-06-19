import React from "react";
import categorize1 from "./images/categorize1.jpg";
import record2 from "./images/record2.jpg";
import savemoney3 from "./images/savemoney3.jpg";
import save from "./images/save.jpg";
import { Carousel } from "react-carousel-minimal";

const MyCarousel = () => {
  const data = [
    {
      image: categorize1,
      caption: "Set Up and Categorize Expenses!",
    },
    {
      image: record2,
      caption: "Record Expenses Promptly and Accurately!",
    },
    {
      image: savemoney3,
      caption: "Analyze, Review and Save Money!",
    },
    {
      image: save,
      caption: "Take control of your life!",
    },
  ];

  const captionStyle = {
    fontSize: "2em",
    fontWeight: "bold",
    color: "white",
  };
  // const slideNumberStyle = {
  //   fontSize: "20px",
  //   fontWeight: "bold",
  // };

  const imageStyle = {
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          padding: "0 0px 0 60px",
        }}
      >
        <Carousel
          data={data}
          time={3000}
          width="800px"
          height="410px"
          captionStyle={captionStyle}
          radius="10px"
          slideNumber={false}
          // slideNumberStyle={false}
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
            margin: "5px auto",
          }}
        >
          {data.map((item, index) => (
            <img
              key={index}
              src={item.image}
              alt={item.caption}
              style={imageStyle}
            />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default MyCarousel;
