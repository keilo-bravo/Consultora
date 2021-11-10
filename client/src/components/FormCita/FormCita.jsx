import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { postConsulta } from "../../redux/actions/index";
import UsuarioNavBar from "../homeUsuario/usuarioNavBar/UsuarioNavBar";
import "./FormCita.css";

export function validate(input) {
  let errors = {};
  if (!input.nombre) {
    errors.nombre = "nombre es requerido";
  } else if (!/\S+\S+/.test(input.nombre)) {
    errors.nombre = "nombre is invalid";
  }

  if (!input.apellido) {
    errors.apellido = "apellido es requerido";
  } else if (!/\S+\S+/.test(input.apellido)) {
    errors.apellido = "apellido is invalid";
  }

  // if (!input.telefono) {
  //   errors.telefono = "Teléfono es requerido";
  // } else if (/\n# $&:\n\t/.test(input.telefono)) {
  //   errors.telefono = "el Teléfono ingresado contiene errores";
  // }

  if (!input.email) {
    errors.email = "email is required";
  } else if (!/\S+@\S+\.\S+/.test(input.email)) {
    errors.email = "email is invalid";
  }

  if (!input.mensaje) {
    errors.mensaje = "Se debe escribir la consulta que desea realizar";
  } else if (input.mensaje === "") {
    errors.mensaje = "El texto se encuentra vacio";
  }
  return errors;
}

export default function FormCita({ history }) {
  const dispatch = useDispatch();

  const { usuario } = useSelector((state) => state);

  const [input, setInput] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    telefono: "",
    email: "",
  });
  const [error, setError] = useState({});

  const { nombre, apellido, dni, telefono, email } = input;

  useEffect(() => {
    console.log(usuario);
    setInput({
      nombre: usuario.firstName,
      apellido: usuario.lastName,
      dni: usuario.dni,
      telefono: usuario.celular,
      email: usuario.eMail,
    });
  }, []);

  const handleChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(error).length === 0) {
      dispatch(postConsulta(input));
      toast.success("La consulta se envió con éxito");
      history.push("/user/panel/consultas");
      setInput(" ");
    } else {
      toast.error("Hubo un problema al enviar la consulta");
    }
  };

  return (
    <>
      <UsuarioNavBar />

      <div className="container mt-5">
        <h1>Nueva consulta</h1>
        <hr />

        <form onSubmit={handleSubmit} className="form-cita">
          <div className="form-group row mt-3">
            <label
              className="col-sm-2 col-form-label"
              htmlFor="nombre"
              htmlFor="nombre"
            >
              Nombre
            </label>
            <div class="col-sm-10">
              <input
                disabled
                className="form-control"
                name="nombre"
                id="nombre"
                type="text"
                value={nombre}
                required
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group row mt-3">
            <label className="col-sm-2 col-form-label" htmlFor="apellido">
              Apellido
            </label>
            <div class="col-sm-10">
              <input
                disabled
                className="form-control"
                name="apellido"
                id="apellido"
                type="text"
                value={apellido}
                required
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group row mt-3">
            <label className="col-sm-2 col-form-label" htmlFor="dni">
              DNI
            </label>
            <div class="col-sm-10">
              <input
                disabled
                className="form-control"
                name="dni"
                id="dni"
                type="number"
                value={dni}
                required
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group row mt-3">
            <label className="col-sm-2 col-form-label" htmlFor="telefono">
              Teléfono
            </label>
            <div class="col-sm-10">
              <input
                disabled
                className="form-control"
                name="telefono"
                id="telefono"
                type="tel"
                value={telefono}
                required
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group row mt-3">
            <label className="col-sm-2 col-form-label" htmlFor="email">
              Email
            </label>
            <div class="col-sm-10">
              <input
                disabled
                className="form-control"
                id="email"
                type="email"
                name="email"
                value={email}
                required
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group row mt-3">
            <label className="col-sm-2 col-form-label mt-4" htmlFor="mensaje">
              Mensaje
            </label>
            <textarea
              className="form-control"
              id="mensaje"
              name="mensaje"
              cols="30"
              rows="10"
              required
              onChange={handleChange}
              placeholder="Detalle su consulta..."
            ></textarea>
          </div>

          <button className="btn btn-secondary col-12 mt-3">Enviar</button>
        </form>
      </div>
    </>
  );
}
