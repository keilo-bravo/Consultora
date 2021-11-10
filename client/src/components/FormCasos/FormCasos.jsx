import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { validate } from "../controller/Validate";
import { postCasos } from "../../redux/actions";
import ButtonSubmit from "../ButtonSubmit/ButtonSubmit";
import InputGlobal from "../InputGlobal/InputGlobal.jsx";
import TextTarea from "../TextTarea/TextTarea";
import EstadoSelect from "../EstadoSelect/EstadoSelect.jsx";
import "./FormCasos.css";
import Navbar from "../home-page/Navbar/Navbar";

const FormCasos = ({ label }) => {
  /*Estados Locales____________________________ */

  const [input, setInput] = useState({
    juez: "",
    numeroExpediente: parseInt("0"),
    juzgado: parseInt("0"),
    detalle: "",
    estado: "",
    eMail: "",
    medidaCautelar: "",
    trabaAfectiva: "",
    vtoMedidaCautelar: "",
    vtoTrabaAfectiva: "",
    jurisdiccion: "",
  });

  const [errors, setErrors] = useState({});

  /* Dispatch______________________ */
  const dispatch = useDispatch();

  /* Efectos Secundarios_______________________ */

  /* Handlers______________________ */

  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handlerEstado = ({ target }) => {
    setInput({
      ...input,
      estado: target.value,
    });

    setErrors(
      validate({
        ...input,
        estado: target.value,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    if (
      input.juez &&
      input.numeroExpediente &&
      input.juzgado &&
      input.detalle &&
      input.estado &&
      input.eMail &&
      input.medidaCautelar &&
      input.trabaAfectiva &&
      input.vtoMedidaCautelar &&
      input.vtoTrabaAfectiva &&
      input.jurisdiccion
    ) {
      dispatch(postCasos(input));
      alert("Creación de datos exitosa");
    } else {
      alert("Se requieren todos los datos completados");
    }
    setInput({
      juez: "",

      numeroExpediente: "",
      juzgado: "",
      detalle: "",
      estado: "",
      eMail: "",
      medidaCautelar: "",
      trabaAfectiva: "",
      vtoMedidaCautelar: "",
      vtoTrabaAfectiva: "",
      jurisdiccion: "",
    });
  };

  return (
    <div className="">
      <Navbar navId={"menu"}/>
      <div className="">
        <div>
          <form onSubmit={handleSubmit}>
            <div className="">
              <label htmlFor="Nombre">Juez:</label>
              <div className="Input_form">
                <InputGlobal
                  type="text"
                  placeholder="Juez"
                  name="juez"
                  value={input.juez}
                  handleInput={handleInput}
                />
              </div>
              {errors.juez && <p className="errors">{errors.juez}</p>}
            </div>

            {/* <div>
              <label htmlFor="Nombre">Numero de Liquidacion:</label>
              <div className="Input_form">
                <InputGlobal
                  type="text"
                  placeholder="Numero de iquidacion"
                  name="numeroLiquidacion"
                  value={input.numeroLiquidacion}
                  handleInput={handleInput}
                />
              </div>
              {errors.numeroLiquidacion && (
                <p className="errors">{errors.numeroLiquidacion}</p>
              )}
            </div> */}

            <div>
              <label>Número de Expediente:</label>
              <div className="Input_form">
                <InputGlobal
                  type="text"
                  placeholder="Número de Expediente"
                  name="numeroExpediente"
                  value={input.numeroExpediente}
                  handleInput={handleInput}
                />
              </div>
              {errors.numeroExpediente && (
                <p className="errors">{errors.numeroExpediente}</p>
              )}
            </div>

            <div>
              <label>Juzgado:</label>
              <div className="Input_form">
                <InputGlobal
                  type="text"
                  placeholder="Juzgado"
                  name="juzgado"
                  value={input.juzgado}
                  handleInput={handleInput}
                />
              </div>

              {errors.juzgado && <p className="errors">{errors.juzgado}</p>}
            </div>

            <div>
              <label>Detalle del Caso:</label>
              <div className="Input_form">
                <TextTarea
                  type="text"
                  placeholder="Detalle del Caso"
                  name="detalle"
                  value={input.detalle}
                  handleInput={handleInput}
                />
              </div>
              {errors.detalle && <p className="errors">{errors.detalle}</p>}
            </div>

            <div>
              <label>Estado del Caso:</label>
              <div className="Input_form">
                <EstadoSelect handlerEstado={handlerEstado} />
              </div>
              {errors.estado && <p className="errors">{errors.estado}</p>}
            </div>

            <div>
              <label>Email:</label>
              <div className="Input_form">
                <InputGlobal
                  type="email"
                  placeholder="Email"
                  name="eMail"
                  value={input.eMail}
                  handleInput={handleInput}
                />
              </div>
              {errors.eMail && <p className="errors">{errors.eMail}</p>}
            </div>

            <div>
              <label>Medida Cautelar:</label>
              <div className="Input_form">
                <InputGlobal
                  type="text"
                  placeholder="Medida Cautelar"
                  name="medidaCautelar"
                  value={input.medidaCautelar}
                  handleInput={handleInput}
                />
              </div>
              {errors.medidaCautelar && (
                <p className="errors">{errors.medidaCautelar}</p>
              )}
            </div>

            <div>
              <label>Traba Afectiva:</label>
              <div className="Input_form">
                <InputGlobal
                  type="text"
                  placeholder="Traba afectiva"
                  name="trabaAfectiva"
                  value={input.trabaAfectiva}
                  handleInput={handleInput}
                />
              </div>
              {errors.trabaAfectiva && (
                <p className="errors">{errors.trabaAfectiva}</p>
              )}
            </div>

            <div>
              <label>VTO Medida Cautelar:</label>
              <div className="Input_form">
                <InputGlobal
                  type="date"
                  name="vtoMedidaCautelar"
                  value={input.vtoMedidaCautelar}
                  handleInput={handleInput}
                />
              </div>
              {errors.vtoMedidaCautelar && (
                <p className="errors">{errors.vtoMedidaCautelar}</p>
              )}
            </div>

            <div>
              <label>VTO Traba Afectiva:</label>
              <div className="Input_form">
                <InputGlobal
                  type="date"
                  name="vtoTrabaAfectiva"
                  value={input.vtoTrabaAfectiva}
                  handleInput={handleInput}
                />
              </div>
              {errors.vtoTrabaAfectiva && (
                <p className="errors">{errors.vtoTrabaAfectiva}</p>
              )}
            </div>

            <div>
              <label>Jurisdiccion:</label>
              <div className="Input_form">
                <InputGlobal
                  type="text"
                  placeholder="Jurisdiccion"
                  name="jurisdiccion"
                  value={input.jurisdiccion}
                  handleInput={handleInput}
                />
              </div>
              {errors.jurisdiccion && (
                <p className="errors">{errors.jurisdiccion}</p>
              )}
            </div>

            <div className="Button_form">
              <ButtonSubmit type={"submit"} text={"Crear Caso"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormCasos;
