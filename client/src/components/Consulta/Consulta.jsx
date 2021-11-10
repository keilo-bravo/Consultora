import React from "react";

export default function Consulta(params) {
  const { nombre, apellido, telefono, email, mensaje } = params;
  return (
    <>
      <div className="datos de cliente">
        <h4>{nombre}</h4>
        <h4>{apellido}</h4>
        <h4>{telefono}</h4>
        <h4>{email}</h4>
      </div>
      <div className="consulta-mensaje">
        <p>{mensaje}</p>
      </div>
    </>
  );
}
