/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { putAbogado, getMaterias } from "../../redux/actions";
import Casos from "../casos/casos";
import "./clientes.css";

export default function Clientes() {
  //muestra cards de cada cliente con sus casos
  const [clientes, setClientes] = useState([]);
  const [flag, setFlag] = useState(false);
  const { usuario, abogado, materias } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(putAbogado({ eMail: usuario.eMail }));
    dispatch(getMaterias());
  }, [dispatch, usuario]);

  useEffect(() => {
    if (abogado.clientes) {
      let AllClients = JSON.parse(JSON.stringify(abogado.clientes));
      AllClients.map(
        (e) => (e.casos = e.casos.filter((e) => e.estado !== "cerrado"))
      );
      AllClients = AllClients.filter((e) => e.casos.length > 0);
      setClientes([...AllClients]);
    }
  }, [abogado.clientes]);

  const handleClick = function (e, flag) {
    e.preventDefault();
    let AllClients = JSON.parse(JSON.stringify(abogado.clientes));
    if (flag === 0) {
      AllClients.map(
        (e) => (e.casos = e.casos.filter((e) => e.estado !== "cerrado"))
      );
      AllClients = AllClients.filter((e) => e.casos.length > 0);
      setClientes([...AllClients]);
    } else if (flag === 1) {
      AllClients.map(
        (e) => (e.casos = e.casos.filter((e) => e.estado === "cerrado"))
      );
      AllClients = AllClients.filter((e) => e.casos.length > 0);
      setClientes([...AllClients]);
    }
  };

  const handleChangeByEstado = (e) => {
    e.preventDefault();
    let AllClients = JSON.parse(JSON.stringify(abogado.clientes));
    if (e.target.value === "inicio") {
      AllClients.map(
        (e) => (e.casos = e.casos.filter((e) => e.estado === "inicio"))
      );
      AllClients = AllClients.filter((e) => e.casos.length > 0);
      setClientes([...AllClients]);
      if (clientes.length === 0)
        return <h3>No hay casos con el estado inicial</h3>;
    } else if (e.target.value === "prueba") {
      AllClients.map(
        (e) => (e.casos = e.casos.filter((e) => e.estado === "prueba"))
      );
      AllClients = AllClients.filter((e) => e.casos.length > 0);
      setClientes([...AllClients]);
      if (clientes.length === 0)
        return <h3>No hay casos con el estado inicial</h3>;
    } else if (e.target.value === "sentencia") {
      AllClients.map(
        (e) => (e.casos = e.casos.filter((e) => e.estado === "sentencia"))
      );
      AllClients = AllClients.filter((e) => e.casos.length > 0);
      setClientes([...AllClients]);
      if (clientes.length === 0)
        return <h3>No hay casos con el estado inicial</h3>;
    }
  };
  const handleChangeByMateria = (e) => {
    e.preventDefault();
    let AllClients = JSON.parse(JSON.stringify(abogado.clientes));
    AllClients.map(
      (a) =>
      (a.casos = a.casos.filter(
        (h) => h.materias[0].nombre === e.target.value
      ))
    );
    AllClients = AllClients.filter((e) => e.casos.length > 0);
    setClientes([...AllClients]);
    if (clientes.length === 0)
      return <h3>No hay casos con el estado inicial</h3>;
  };
  const handleChangeByFecha = (e) => {
    e.preventDefault();
    let AllClients = JSON.parse(JSON.stringify(abogado.clientes));
    AllClients = AllClients.filter((e) => e.casos.length > 0);

    if (e.target.value === "Ascendente") {
      AllClients.map((e) =>
        e.casos.sort(function (a, b) {
          if (Date.parse(a.fecha) > Date.parse(b.fecha)) {
            return 1;
          }
          if (Date.parse(a.fecha) < Date.parse(b.fecha)) {
            return -1;
          }
          return 0;
        })
      );
    } else if (e.target.value === "Descendente") {
      AllClients.map((e) =>
        e.casos.sort(function (a, b) {
          if (Date.parse(a.fecha) < Date.parse(b.fecha)) {
            return 1;
          }
          if (Date.parse(a.fecha) > Date.parse(b.fecha)) {
            return -1;
          }
          return 0;
        })
      );
    }
    setClientes([...AllClients]);
    if (clientes.length === 0)
      return <h3>No hay casos con el estado inicial</h3>;
  };

  return (
    <div className="mt-3 me-3 ms-3 mb-3 d-inline-flex flex-row">
      <div className="mt-3 me-3 ms-3 d-inline-flex flex-column">
        <button
          className=" btn  btn-danger  mt-3 mb-3"
          onClick={(e) => handleClick(e, 0)}
        >
          Clientes Actuales
        </button>
        <button
          className="btn  btn-danger mt-3 mb-3 "
          onClick={(e) => handleClick(e, 1)}
        >
          Historial
        </button>
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={(e) => handleChangeByEstado(e)}
        >
          <option selected>Seleccion por estado</option>
          <option value="inicio">inicio</option>
          <option value="prueba">prueba</option>
          <option value="sentencia">sentencia</option>
        </select>
        <select
          className="mt-3 form-select"
          onChange={(e) => handleChangeByMateria(e)}
        >
          <option value={null}>Seleccion por materia</option>
          {materias.map((e) => (
            <option value={e.nombre}>{e.nombre}</option>
          ))}
        </select>
        <select className="mt-3 form-select" onChange={handleChangeByFecha}>
          <option value={null}>Ordenar por fecha</option>
          <option value="Ascendente">Ascendente</option>
          <option value={"Descendente"}>Descendente</option>
        </select>
      </div>

      <div className="conteiner card mt-3 me-3 ms-3  flex-column">
        {clientes.map((e) => {
          const { id, casos, persona } = e;
          return (
            <div className="conteiner card mt-3 me-3 ms-3 mb-3 d-inline-flex flex-column">
              <Casos
                key={id}
                id={id}
                casos={casos}
                persona={persona}
                flag={flag}
              />
              <div className="d-inline-flex flex-row justify-content-center ">

                {flag ? (
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-primary d-flex justify-content-center mt-3 mb-3 me-3"
                      onClick={(e) => setFlag(!flag)}
                    >
                      Terminar
                    </button>
                  </div>
                ) : (
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-primary d-flex justify-content-center mt-3 mb-3 me-3"
                      onClick={(e) => setFlag(!flag)}
                    >
                      modificar
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
