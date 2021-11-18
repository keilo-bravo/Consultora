import React from "react";

export default function Consulta(params) {
  const { nombre, apellido, telefono, email, mensaje, abogadoId } = params;
  return (
    <>
      <div className="card bg-dark text-white">
        <div className="card-title">
          <h4>{nombre}</h4>
          <h4>{apellido}</h4>
          <h4>{telefono}</h4>
          <h4>{email}</h4>
        </div>
        <div className="card-text">
          <p>{mensaje}</p>
          <p>abogado asignado:{abogadoId ? abogadoId : "sin asignar"}</p>
        </div>
      </div>
    </>
  );
}
