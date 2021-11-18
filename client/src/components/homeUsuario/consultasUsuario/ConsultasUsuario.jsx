import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import {
  deleteConsulta,
  getConsultas,
  modificarTicket,
  getTickets,
} from "../../../redux/actions";
import UsuarioNavBar from "../usuarioNavBar/UsuarioNavBar";

export default function ConsultasUsuario() {
  const dispatch = useDispatch();

  const { consultas, usuario } = useSelector((state) => state);
  const [n_operacion, setN_Operacion] = useState("");

  useEffect(() => {
    if (consultas) {
      dispatch(getConsultas());
    }
  }, []);

  function efectuarPago(enlace) {
    swal({
      title: "Notificar pago de la consulta",
      text: "Si ya abonó la consulta puede proceder a notificarlo, ¿notificar el pago de la consulta?",
      icon: "warning",
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(modificarTicket({ enlace, n_operacion }));

        setTimeout(() => {
          dispatch(getConsultas());
        }, 1000);
      }
    });
  }

  function eliminarConsulta(consultaId) {
    swal({
      title: "Eliminar",
      text: "¿Quiere eliminar la consulta?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteConsulta(consultaId)).then(() => {
          dispatch(getConsultas());
        });
        swal("La consulta fue eliminada", {
          icon: "success",
        });
      }
    });
  }

  return (
    <>
      <UsuarioNavBar></UsuarioNavBar>

      <div className="container mt-5">
        <h1>Consultas realizadas</h1>
        <hr></hr>
      </div>

      <table className="table table-hover mt-5">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Mensaje</th>

            <th>Respuesta</th>
            <th>Estado</th>
            <th>Link de pago</th>
            {/* <th>Notificar pago</th> */}
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {consultas
            ?.filter((c) => c.dni?.toString() === usuario.dni?.toString())
            .map((consulta) => {
              return (
                <tr key={consulta.id} className="align-middle">
                  <td>
                    <div className="text-muted">
                      {new Date(consulta.createdAt).toLocaleTimeString()}
                    </div>
                    <div>
                      {new Date(consulta.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="w-25">{consulta.mensaje}</td>

                  {consulta.respuestaAbogado ? (
                    <td>{consulta.respuestaAbogado}</td>
                  ) : (
                    <td className="text-muted">Aún no se ha respondido</td>
                  )}

                  <td>
                    {consulta.abogadoId ? (
                      <span className="badge bg-success">Aceptado</span>
                    ) : (
                      <span className="badge bg-warning">En revisión</span>
                    )}
                  </td>

                  {!consulta.ticket ? (
                    <td className="text-muted">No hay enlance de pago</td>
                  ) : consulta.ticket.estatus === "pending" ? (
                    <td>
                      <a href={consulta.ticket.enlace} target="_blank">
                        Enlace al pago
                      </a>
                    </td>
                  ) : (
                    <td className="text-success">La consulta fue abonada</td>
                  )}

                  {/* {
                                    <td>
                                        <input type="number" min="0" name="n_operacion" autoComplete="off" placeholder="1111111111" className="form-control" required onChange={(e) => { setN_Operacion(e.target.value) }} />
                                        <button disabled={consulta?.ticket?.estatus !== 'pending'} onClick={() => { efectuarPago(consulta.ticket?.enlace, n_operacion) }} className={`btn btn-${consulta.ticket?.estatus === 'pending' ? 'success' : 'light text-muted'}`}>Notificar</button>
                                    </td>
                                } */}

                  <td>
                    <button
                      disabled={consulta.abogadoId}
                      onClick={() => {
                        eliminarConsulta(consulta.id);
                      }}
                      className={`btn btn-${
                        !consulta.abogadoId
                          ? "dangerNuestro"
                          : "light text-muted"
                      }`}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}
