import React from "react";

const Background = () => {
  const getRandomNumberBetween = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  const generateStars = (numberOfStars) => {
    let stars = "";
    for (let i = 0; i < numberOfStars; i++) {
      stars += `${getRandomNumberBetween(-50, 50)}vw ${getRandomNumberBetween(
        -50,
        50
      )}vh ${getRandomNumberBetween(0, 2)}px ${getRandomNumberBetween(
        0,
        1
      )}px #fff,`;
    }
    return stars.substring(0, stars.length - 1);
  };
  return (
    <div className="background" style={{ boxShadow: generateStars(250) }}></div>
  );
};

export default React.memo(Background);
