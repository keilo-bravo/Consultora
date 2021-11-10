import React from "react";

const InputGlobal = (props) => {
    const {
        type,
        placeholder,
        name,
        value,
        handleInput
    } = props
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleInput}
        onKeyUp={handleInput}
        onBlur={handleInput}
        autoComplete="off"
      />
    </>
  );
};

export default InputGlobal;
