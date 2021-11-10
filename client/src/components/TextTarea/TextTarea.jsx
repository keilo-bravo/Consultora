import React from "react";

const TextTarea = (props) => {
  const { name, placeholder, value, handleInput } = props;
  return (
    <>
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleInput}
        onKeyUp={handleInput}
        onBlur={handleInput}
        id=""
        cols="30"
        rows="10"
      />
    </>
  );
};

export default TextTarea;
