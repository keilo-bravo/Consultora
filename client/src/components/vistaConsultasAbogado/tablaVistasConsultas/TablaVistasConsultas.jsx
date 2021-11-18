import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTickets, mostrarConsulta } from '../../../redux/actions';


import './tablaVistasConsultas.css';

export default function TablaVistasConsultas({ consultas, usuario, aceptadas, terminoBusquedaTodas, terminoBusquedaAceptadas }) {


  let [pagina, setPagina] = useState(0);
  let [consultasMostrar, setConsultasMostrar] = useState([]);

  const cantidad = useRef(8);

  const dispatch = useDispatch();

  useEffect(() => {
    setConsultasMostrar(consultas?.slice(pagina, pagina + cantidad.current))
  }, [consultas]);

  useEffect(() => {
    setConsultasMostrar(consultas?.slice(pagina, pagina + cantidad.current))
  }, [pagina]);

  function setConsulta(consulta) {
    dispatch(mostrarConsulta(consulta))
    dispatch(getTickets(consulta.ticketId))
  }



  return (<>


    <div className="my-4 mx-1">
      <table className="table table-hover table-striped">
        <thead className="text-center">
          <tr>
            <th scope="col">Fecha</th>
            <th scope="col">Estado</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            {/* <th scope="col">TelÃ©fono</th> */}
            <th scope="col">Dni</th>
            {/* <th scope="col">Email</th> */}
            <th scope="col">Mensaje</th>
            <th scope="col">Pago</th>
            <th scope="col">Opciones</th>
          </tr>
        </thead>
        <tbody>

          {
            ((terminoBusquedaTodas && terminoBusquedaTodas.length > 2) || (aceptadas) || (terminoBusquedaAceptadas && terminoBusquedaAceptadas.length > 2) ? consultas : consultasMostrar).filter((c) => {

              if (terminoBusquedaAceptadas && aceptadas) {
                return (c.dni.includes(terminoBusquedaAceptadas) || c.nombre.toLowerCase().includes(terminoBusquedaAceptadas.toLowerCase()) || c.apellido.toLowerCase().includes(terminoBusquedaAceptadas.toLowerCase())) && c.abogadoId === usuario?.abogado?.id
              } else if (terminoBusquedaTodas && !aceptadas) {
                return (c.dni.includes(terminoBusquedaTodas) || c.nombre.toLowerCase().includes(terminoBusquedaTodas.toLowerCase())) || c.apellido.toLowerCase().includes(terminoBusquedaTodas.toLowerCase())
              } else if (aceptadas) {
                return c.abogadoId === usuario?.abogado?.id
              } else {
                return c
              }
            }).map((consulta, i) => {
              return (
                <tr key={consulta.createdAt} className="text-center">
                  <td className="align-middle">
                    <div className="text-muted">
                      {new Date(consulta.createdAt).toLocaleTimeString()}
                    </div>
                    <div>
                      {new Date(consulta.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  {consulta.abogadoId ?
                    <td className="align-middle"><span className="badge bg-warning">Aceptada</span></td>
                    :
                    <td className="align-middle"><span className="badge bg-success">Libre</span></td>
                  }

                  <td className="align-middle">{consulta.nombre}</td>
                  <td className="align-middle">{consulta.apellido}</td>
                  {/* <td className="align-middle">{consulta.telefono}</td> */}
                  <td className="align-middle">{consulta.dni}</td>
                  {/* <td className="align-middle">{consulta.email}</td> */}
                  <td className="align-middle" className="w-50">{consulta.mensaje}</td>

                  {!consulta.ticket ?
                    <td className="align-middle text-muted">Pago no emitido</td>
                    :
                    consulta.ticket?.estatus === 'pending' ?
                      <td className="align-middle text-warning"><span className="badge bg-warning">Pago pendiente</span></td>
                      :
                      <td className="align-middle text-success"><span className="badge bg-success">Abonado</span></td>
                  }

                  <td className="align-middle">

                    <button onClick={() => { setConsulta(consulta) }} type="button" className="btn btn-primaryNuestro" data-bs-toggle="modal" data-bs-target={`#modalConsulta`}>
                      Ver detalle
                    </button>
                    {/* <ModalConsulta consulta={consulta} usuario={usuario} modalId={`modal${consulta.id}`} /> */}
                  </td>
                </tr>

              );
            })
          }
          <tr>
          </tr>
        </tbody>
      </table>


      {(!consultas.length) &&
        <div className="text-center p-5 fw-bold">
          No hay consultas para mostrar
        </div>}


      {/* { !aceptadas || !terminoBusquedaAceptadas || !terminoBusquedaTodas || consultas.length <= cantidad.current && */}
      {(!terminoBusquedaTodas && !terminoBusquedaAceptadas && !aceptadas || consultas.length <= cantidad.current) && (consultas.length > cantidad.current) &&
        <nav aria-label="Page navigation example" className="">
          <ul className="pagination pagination-lg">
            <div className="row mx-auto botones-paginador">

              <li className="page-item col">
                <button disabled={pagina === 0} onClick={() => setPagina(pagina - cantidad.current)} className="page-link bg-light" href="#" aria-label="Previous">
                  <span aria-hidden="true" className="fs-3">&laquo;</span>
                </button>
              </li>

              <li className="page-item col">
                <button disabled={(pagina + cantidad.current) >= consultas.length} onClick={() => setPagina(pagina + cantidad.current)} className="page-link bg-light" href="#" aria-label="Next">
                  <span aria-hidden="true" className="fs-3">&raquo;</span>
                </button>
              </li>
            </div>
          </ul>
        </nav>
      }


    </div>




  </>)
}