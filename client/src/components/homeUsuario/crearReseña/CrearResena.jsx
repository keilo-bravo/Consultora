import React, { useState } from "react";

export default function CrearResena() {
  const [input, setInput] = useState({});

  const handleChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = function (e) {
    e.preventDefault();
    console.log(input);
  };
  return (
    <form onSubmit={handleSubmit}>
      <legend>Titulo</legend>
      <input type="text" id="titulo" onChange={handleChange} />
      <legend>Mensaje</legend>
      <textarea id="mensaje" onChange={handleChange}></textarea>
      <legend>Perfomrance o puntuación</legend>
      <select name="puntuacion" id="puntuacion" onChange={handleChange}>
        <option value hidden>
          Coloque un puntaje de 1 a 5
        </option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <input type="button" value="enviar" />
    </form>
  );
}
