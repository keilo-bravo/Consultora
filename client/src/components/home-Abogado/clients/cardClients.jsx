import React from "react";

export default function CardClients({ persona }) {
  const { firstName, lastName, celular, dni } = persona;

  return (
    <div className="container">
      <ul className="list-group mb-3 mt-3 me-3 ms-3 text-white">
        <li className="list-group-item">
          Nombre: {firstName} {lastName}
        </li>
        <li className="list-group-item">Telefono: {celular}</li>
        <li className="list-group-item">Dni: {dni}</li>
      </ul>
    </div>
  );
}
