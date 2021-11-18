import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCasos } from "../../redux/actions/index";
import Casos from "../casos/casos";
import NavUsuario from "./NavUsuario/NavUsuario";
import { Redirect } from "react-router";

export default function HomeUsuario() {
  const dispatch = useDispatch();
  const { casos, usuario } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getCasos(usuario.clienteId));
  }, [dispatch, usuario]);

  console.log(usuario);

  if (!usuario) {
    return <Redirect to="/" />;
  }

  if (!casos.count) {
    return <p>No tienes casos</p>;
  }

  return (
    <div>
      <NavUsuario />
      <Casos casos={casos.result} persona={usuario} />
    </div>
  );
}
