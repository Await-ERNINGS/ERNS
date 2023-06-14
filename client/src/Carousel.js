import React, { useState } from "react";

const Carousel = () => {
  const [index, setIndex] = useState(0);
  const length = 3;

  const handlePrevious = () => {
    const newIndex = index - 1;
    setIndex(newIndex < 0 ? length - 1 : newIndex);
  };

  const handleNext = () => {
    const newIndex = index + 1;
    setIndex(newIndex >= length ? 0 : newIndex);
  };

  return (
    <>
      <div className="carousel">
        <button onClick={handlePrevious}>{"<"}</button>
        <div>hello</div>
        <button onClick={handleNext}>{">"}</button>
      </div>
      <div>{index}</div>
    </>
  );
};

export default Carousel;
