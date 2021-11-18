import React from "react";
import { useSelector } from 'react-redux';

export default function DetalleConsulta (props) {

    let consulta = useSelector((state) => {
        console.log("useSelector", state.consulta)
        return state.consulta});

    return (
        <div
        className="modal fade"
        id={`${props.modalId}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Detalle de la consulta
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body ">
              <ul className="list-group">
                <li className="list-group-item active">
                  <span className="align-middle">
                    Nombre: {consulta?.nombre} {consulta?.apellido}{" "}
                  </span>
                </li>
                {/*<li className="list-group-item ">
                  <span>DNI: </span>
                  {consulta?.dni}
                </li> 
                <li className="list-group-item ">
                  <span>Teléfono: </span>
                  {consulta?.telefono}
                </li>
                <li className="list-group-item ">
                  <span>Email: </span>
                  {consulta?.email}
                </li>*/}


                <li className="list-group-item ">
                  <span>{consulta?.mensaje}</span>
                </li>
              </ul>
              <br/>
              <ul className="list-group">
                <li className="list-group-item active">
                  <span className="align-middle">
                  </span>
                      {consulta?.abogado ? "Abogado:" + consulta?.abogado?.firstName + " " +consulta?.abogado?.lastName : "En revisión"}
                </li>
                
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
}