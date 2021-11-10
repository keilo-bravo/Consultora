import React from "react";

const CardBanner = ({ nameStyle, img, text }) => {
  return (
    <div className={nameStyle}>
      <img src={img} alt="card" />
      <p>{text}</p>
    </div>
  );
};

export default CardBanner;
