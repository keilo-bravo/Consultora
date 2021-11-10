import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Redirect } from "react-router";
import { getConsultas, getTickets } from "../../redux/actions";
import ModalConsulta from "./modalConsulta/ModalConsulta";
import TablaVistasConsultas from "./tablaVistasConsultas/TablaVistasConsultas";
import "./VistaConsultasAbogados.css";

export default function VistaConsultasAbogado() {
  let [busquedaTodas, setBusquedaTodas] = useState("");
  let [busquedaAceptadas, setBusquedaAceptadas] = useState("");

  const dispatch = useDispatch();
  const { consultas, usuario } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getConsultas());
  }, []);

  function actualizarConsultas() {
    dispatch(getConsultas());
    toast.success("Las consultas fueron actualizadas");
  }

  return !usuario.abogadoId ? (
    <Redirect to="/" />
  ) : (
    <>
      <ModalConsulta usuario={usuario} modalId={`modalConsulta`} />

      <nav className="text-center mt-5">
        <div className="nav nav-tabs text-center" id="nav-tab" role="tablist">
          <button
            className="w-25 nav-link active"
            id="nav-home-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-home"
            type="button"
            role="tab"
            aria-controls="nav-home"
            aria-selected="true"
          >
            Todas ({consultas.length})
            <input
              name="busquedaTodas"
              onChange={(e) => setBusquedaTodas(e.target.value)}
              value={busquedaTodas}
              autoComplete="off"
              className="form-control m-1"
              placeholder="Búsqueda por DNI, nombre o apellido"
            ></input>
          </button>
          <button
            className="w-25 nav-link"
            id="nav-profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-profile"
            type="button"
            role="tab"
            aria-controls="nav-profile"
            aria-selected="false"
          >
            Aceptadas
            <input
              name="busquedaAceptads"
              onChange={(e) => setBusquedaAceptadas(e.target.value)}
              value={busquedaAceptadas}
              autoComplete="off"
              className="form-control m-1"
              placeholder="Búsqueda por DNI, nombre o apellido"
            ></input>
          </button>
          {/* <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Contact</button> */}
          <button
            onClick={actualizarConsultas}
            className="mx-5 btn btn-light border"
          >
            🔁 Actualizar
          </button>
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div
          className="tab-pane fade show active"
          id="nav-home"
          role="tabpanel"
          aria-labelledby="nav-home-tab"
        >
          <TablaVistasConsultas
            consultas={consultas}
            terminoBusquedaTodas={busquedaTodas}
            usuario={usuario}
          ></TablaVistasConsultas>
        </div>
        <div
          className="tab-pane fade"
          id="nav-profile"
          role="tabpanel"
          aria-labelledby="nav-profile-tab"
        >
          <TablaVistasConsultas
            consultas={consultas}
            terminoBusquedaAceptadas={busquedaAceptadas}
            usuario={usuario}
            aceptadas={true}
          ></TablaVistasConsultas>
        </div>
        {/* <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">...</div> */}
      </div>
    </>
  );
}
