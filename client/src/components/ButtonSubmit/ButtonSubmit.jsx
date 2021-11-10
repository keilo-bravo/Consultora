import React from "react";

const ButtonSubmit = ({ type, text }) => {
  return (
    <>
      <button type={type}>{text}</button>
    </>
  );
};

export default ButtonSubmit;
