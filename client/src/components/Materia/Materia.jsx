import React from "react";
import "./Materia.css";

const Materia = ({ nombre, id }) => {
  return (
    <div key={id} className="materia mb-3 col-md-3">
      <h5 className="materia-nombre">{nombre}</h5>
      <div className="button_learn-more">
        <button className="learn-more">
          <span aria-hidden="true" className="circle">
            <span className="icon arrow"></span>
          </span>
          <span className="button-text">Leer mas</span>
        </button>
      </div>
    </div>
  );
};

export default Materia;
