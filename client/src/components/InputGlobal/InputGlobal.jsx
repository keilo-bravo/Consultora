import React from "react";

const InputGlobal = (props) => {
  const {
    type,
    placeholder,
    name,
    value,
    handleInput,
    className
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
        className={className}
      />
    </>
  );
};

export default InputGlobal;
