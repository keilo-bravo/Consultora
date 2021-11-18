import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { putAbout } from "../../../redux/actions/index";
import "./about.css"

export default function About(props) {
  const [flag, setFlag] = useState(false);
  const dispatch = useDispatch();

  const { sobreNosotros, nuestraFilosofia, direccion, contacto, id } =
    props.about;
  const [input, setInput] = useState({
    id,
    sobreNosotros,
    nuestraFilosofia,
    direccion,
    contacto,
  });

  useEffect(() => {
    setInput({ id: id, sobreNosotros: sobreNosotros, nuestraFilosofia: nuestraFilosofia, direccion: direccion, contacto: contacto })
  }, [contacto, direccion, id, nuestraFilosofia, sobreNosotros])

  return (
    <div>
      {flag ? (
        <div className="container mt-2 card  mb-4">
          <form className="form-group mt-3"
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(putAbout(input));
              toast.success("Cambios aplicados")
            }}
          >
            <ul style={{ paddingLeft: "0 " }}>
              <li>
                <label>Sobre Nosotros:</label>
                <textarea
                  placeholder="Sobre Nosotros..."
                  className="textarea-about mb-3 p-3"
                  value={input.sobreNosotros}
                  onChange={(e) =>
                    setInput({ ...input, sobreNosotros: e.target.value })
                  }
                ></textarea>
              </li>
              <li>
                <label>Nuestra Filosofía:</label>
                <textarea
                  placeholder="Nuestra Filosofía..."
                  className="textarea-about mb-3 p-3"
                  value={input.nuestraFilosofia}
                  onChange={(e) =>
                    setInput({ ...input, nuestraFilosofia: e.target.value })
                  }
                ></textarea>
              </li>
              <li>
                <label>Nuetra Direccion:</label>
                <input placeholder="Nuetra Direccion..."
                  className="input-about mb-3 p-2"
                  value={input.direccion}
                  onChange={(e) =>
                    setInput({ ...input, direccion: e.target.value })
                  }></input>
              </li>
              <li>
                <label>Mi Email De Contacto:</label>
                <input
                  type="email"
                  placeholder="Mi Email De Contacto..."
                  value={input.contacto}
                  className="input-about mb-3 p-2"
                  onChange={(e) =>
                    setInput({ ...input, contacto: e.target.value })
                  }
                ></input>
              </li>
            </ul>
            <div className="d-flex justify-content-center mt-3 mb-3 ">

              <button type="submit" className="button-about">Submit</button>
            </div>
          </form>
          <div className="d-flex justify-content-center mt-3 mb-3">

            <button
              onClick={(e) => {
                setFlag(false);
              }}
              className="button-about"
            >
              Terminar
            </button>
          </div>
        </div>
      ) : (
        <div className="container mt-2 card  mb-4">

          <div className="div-about text-white mb-3 p-3 mt-3">
            <label>Sobre Nosotros:</label>
            <p> {sobreNosotros}</p>
          </div>
          <div className="div-about text-white mb-3 p-3">
            <label>Nuestra Filosofia: </label>
            <p> {nuestraFilosofia}</p>
          </div>
          <div className="div-about text-white mb-3 p-2 ">
            <label >Nuestra Direccion: </label>
            <p>{direccion ? direccion : "Todavia no hay nada definido"}</p>
          </div>
          <div className="div-about text-white mb-3 p-2">
            <label >Contacto:</label>
            <p>Contacto: {contacto ? contacto : "Todavia no hay nada definido"}</p>
          </div>

          <div className="d-flex justify-content-center mb-3 mt-1">
            <button
              onClick={() => {
                setFlag(true);
              }}
              className="button-about"
            >
              Modificar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
