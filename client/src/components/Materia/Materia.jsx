import React from "react";
import { Link } from "react-router-dom";
import "./Materia.css";

const Materia = ({ nombre }) => {
  return (
    <div className="materia mb-3 col-md-3">
      <h5 className="materia-nombre">{nombre}</h5>
      <div className="button_learn-more">
        <button className="learn-more">
          <span aria-hidden="true" className="circle">
            <span className="icon arrow"></span>
          </span>
          <Link to={`/materias/${nombre}`}>
            <span className="button-text">Leer mas</span>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Materia;
