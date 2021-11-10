/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setUsuario } from "../../redux/actions";
import Navbar from "../home-page/Navbar/Navbar";

import "./ModificarAbogado.css";

const ENDPOINT_URL = "http://localhost:3001";

export default function ModificarAbogado() {
  let [form, setForm] = useState({
    nombre: "",
    apellido: "",
    detalle: "",
    experiencia: "",
    estudios: "",
    imagen: "",
  });
  let [errores, setErrores] = useState([]);
  let [loading, setLoading] = useState(false);
  let [loadingImage, setLoadingImage] = useState(false);

  let { nombre, apellido, detalle, experiencia, estudios, imagen } = form;

  let usuario = useSelector((state) => state.usuario);
  const dispatch = useDispatch();

  useEffect(() => {
    return axios
      .get(`/abogado/${usuario.slug}`)
      .then(({ data }) => {
        setForm({
          nombre: data.firstName,
          apellido: data.lastName,
          detalle: data.detalle || "",
          experiencia: data.experiencia || "",
          estudios: data.estudios || "",
          imagen: data.imagen,
        });
      });
  }, []);

  function modificarImagen(e) {
    if (!e.target.files[0]) return;

    setLoadingImage(true);

    let formData = new FormData();
    formData.append("image", e.target.files[0]);
    formData.append("email", usuario.eMail);

    axios
      .post(`/subirimagen`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        axios
          .get(`/abogado/${usuario.slug}`)
          .then(({ data }) => {
            setForm({ ...form, imagen: data.imagen });
            toast.success("La imagen fue cambiada con éxito");
            setLoadingImage(false);
          })
          .catch((err) => console.log(err));
      });
  }

  function eliminarImagen() {
    axios
      .post(`/eliminarimagen`, {
        public_id: imagen.substring(imagen.lastIndexOf("/") + 1).slice(0, -4),
        email: usuario.eMail,
      })
      .then(() => {
        setForm({ ...form, imagen: "" });
        toast.info("La foto fue eliminada");
      })
      .catch((err) => console.log(err));
  }

  function modificarCampos(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function enviarForm(e) {
    e.preventDefault();

    setErrores([]);

    if (!nombre) {
      setErrores((errores) => [...errores, "El nombre es requerido"]);
    }
    if (!apellido) {
      setErrores((errores) => [...errores, "El apellido es requerido"]);
    }
    if (!detalle) {
      setErrores((errores) => [...errores, "El detalle es requerido"]);
    }
    if (!estudios) {
      setErrores((errores) => [...errores, "Los estudios son requeridos"]);
    }

    if (!nombre || !apellido || !detalle || !estudios) return;

    setLoading(true);
    axios
      .put(`/abogado/${usuario.eMail || usuario.eMail}`, form)
      .then(({ data }) => {
        setLoading(false);
        toast.success("Los cambios fueron guardados");
        dispatch(setUsuario(data));
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Navbar></Navbar>

      <div className="container shadow p-5 bg-light animate__animated animate__fadeIn animate__faster">
        <h2 className="">Modificar perfil</h2>

        <hr></hr>

        <form onSubmit={enviarForm}>
          <div className="text-center">
            <label htmlFor="inputGroupFile01" className="my-4">
              {imagen ? (
                <>
                  <div className="container-imagen-boton">
                    <button
                      type="button"
                      disabled={loadingImage}
                      className="btn btn-danger position-absolute boton-eliminar-imagen"
                      onClick={eliminarImagen}
                    >
                      X
                    </button>

                    <img
                      className="animate__animated animate__fadeIn animate__faster rounded mx-auto d-block shadow imagen-perfil-abogado imagen-cambiar-abogado pointer"
                      src={imagen}
                      alt="imagen"
                    ></img>
                  </div>
                </>
              ) : (
                <img
                  className="animate__animated animate__fadeIn animate__faster rounded d-block shadow imagen-cambiar-abogado pointer"
                  src={
                    "data:image/png;base64,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"
                  }
                  alt="imagen"
                />
              )}

              <input
                hidden
                accept="image/*"
                disabled={loadingImage}
                onChange={modificarImagen}
                type="file"
                className="form-control"
                id="inputGroupFile01"
              ></input>

              {loadingImage && (
                <div className="progress">
                  <div
                    className="progress-bar progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    aria-valuenow="75"
                    aria-valuemin="50"
                    aria-valuemax="100"
                    style={{ width: 100 + "%" }}
                  ></div>
                </div>
              )}
            </label>
          </div>

          {errores.length > 0 && (
            <div className="alert alert-danger">
              {errores.map((e, i) => {
                return (
                  <p key={i}>
                    <span className="fw-bold">X </span>
                    {e}
                  </p>
                );
              })}
            </div>
          )}

          <div className="row">
            <div className="col mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Nombre
              </label>
              <input
                name="nombre"
                value={nombre}
                onChange={modificarCampos}
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder=""
              ></input>
            </div>
            <div className="col mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Apellido
              </label>
              <input
                name="apellido"
                value={apellido}
                onChange={modificarCampos}
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder=""
              ></input>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Detalle
            </label>
            <textarea
              name="detalle"
              value={detalle}
              onChange={modificarCampos}
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Experiencia
            </label>
            <textarea
              name="experiencia"
              value={experiencia}
              onChange={modificarCampos}
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Estudios
            </label>
            <textarea
              name="estudios"
              value={estudios}
              onChange={modificarCampos}
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>

          <div className="text-end mb-5">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? "Guardando..." : "Guardar cambios"}
            </button>
            {/* <button type="button" className="btn btn-secondary">Cancelar</button> */}
          </div>
        </form>
      </div>
    </>
  );
}
