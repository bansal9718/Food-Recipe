import React, { useState } from "react";
import "remixicon/fonts/remixicon.css";

const RatingsComponent = ({ initialRating, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating || 0);

  const handleMouseEnter = (value) => {
    setRating(value);
  };
  const handleMouseLeave = () => {
    setRating(initialRating || 0);
  };

  const handleClick = (value) => {
    setRating(value);
    onRatingChange(value);
  };
  return (
    <div>
      <h3>Rate the Recipe</h3>
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          onMouseEnter={() => handleMouseEnter(value)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(value)}
          style={{
            cursor: "pointer",
            fontSize: "24px",
            color: value <= rating ? "#FFD700" : "#ccc",
          }}
        >
          *
        </span>
      ))}
      <p>{rating} out of 5</p>
    </div>
  );
};

export default RatingsComponent;
