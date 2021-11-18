import React from "react";

export default function Resena(params) {
  return (
    <div className="card text-white bg-primary mb-3">
      <div className="card-header">Titulo: {params.title}</div>
      <div className="card-body">
        <h4 className="card-title">Performance:{params.puntuacion}</h4>
        <h5 className="card-title">Mensaje</h5>
        <p className="card-text">{params.mensaje}</p>
      </div>
    </div>
  );
}
