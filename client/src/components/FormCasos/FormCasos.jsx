import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { postCasos } from "../../redux/actions";
import "./FormCasos.css";

const FormCasos = ({ cliente }) => {
  const dispatch = useDispatch()
  const { materias } = useSelector(state => state)
  console.log(cliente)
  const [input, setInput] = useState({
    detalle: null,
    estado: null,
    juez: null,
    juzgado: null,
    numeroExpediente: null,
    medidaCautelar: null,
    trabaAfectiva: null,
    vtoMedidaCautelar: null,
    vtoTrabaAfectiva: null,
    jurisdiccion: null,
    materia: null,
    id: cliente

  })
  const [error, setError] = useState({

    medidaCautelar: "",
    trabaAfectiva: "",
    vtoMedidaCautelar: "",
    vtoTrabaAfectiva: "",
    detalle: "",
    materia: ""

  })

  const handleSubmit = function (e) {
    e.preventDefault()
    if (!input.detalle || input.estado === "Seleccione un estado" || input.materia === "Seleccione una materia") {
      setError({ error, detalle: "debe dar un detalle" })
      toast.error('No se pudo crear el caso!');
    } else {
      dispatch(postCasos(input))
      toast.success('Caso Subido!');
      setInput({
        detalle: null,
        estado: null,
        juez: null,
        juzgado: null,
        numeroExpediente: null,
        medidaCautelar: null,
        trabaAfectiva: null,
        vtoMedidaCautelar: null,
        vtoTrabaAfectiva: null,
        jurisdiccion: null,
        materia: null,
        id: cliente
      })
    }
  }
  const validate = function (name, value) {
    if (name === "detalle") {
      if (value === "" || !value)
        setError({ ...error, vtoTrabaAfectiva: "Debe dar un detalle" })
    }
    if (name === "trabaAfectiva") {
      console.log(input.trabaAfectiva, value)
      if (value && !input.vtoTrabaAfectiva) {
        setError({ ...error, vtoTrabaAfectiva: "debe ingresar una fecha o seleccionar 'no'" })
      }
      if (!value && input.vtoTrabaAfectiva) {
        console.log("vtoTrabaAfectiva y no trabaAfectiva")
        setError({ ...error, trabaAfectiva: "si desea ingresar una fecha de trava afectiva debe marcar 'si'" })
      }
      if (value && input.vtoTrabaAfectiva) {
        setError({ ...error, vtoTrabaAfectiva: "", trabaAfectiva: "" })
      }
      if (!value && !input.vtoTrabaAfectiva) {
        setError({ ...error, vtoTrabaAfectiva: "", trabaAfectiva: "" })
      }
    } else if (name === "medidaCautelar") {
      if (value && !input.vtoMedidaCautelar)
        setError({ ...error, vtoMedidaCautelar: "debe ingresar una fecha" })
      if (!value && input.vtoMedidaCautelar)
        setError({ ...error, vtoMedidaCautelar: "debe borrar la fecha" })
      if (value && input.vtoMedidaCautelar) {
        setError({ ...error, vtoMedidaCautelar: "", medidaCautelar: "" })
      }
      if (!value && !input.vtoMedidaCautelar) {
        setError({ ...error, vtoMedidaCautelar: "", medidaCautelar: "" })
      }


    }
    else if (name === "vtoMedidaCautelar") {
      if (input.medidaCautelar && !value) {
        setError({ ...error, medidaCautelar: "si desea eliminar la fecha de medida cautelar debe marcar 'no' " })
      }
      if (!input.medidaCautelar && value) {
        setError({ ...error, medidaCautelar: "debe ingresar seleccionar 'si'" })
      }
      if (input.medidaCautelar && value) {
        setError({ ...error, vtoMedidaCautelar: "", medidaCautelar: "" })
      }
      if (!input.medidaCautelar && !value) {
        setError({ ...error, vtoMedidaCautelar: "", medidaCautelar: "" })
      }
    } else if (name === "vtoTrabaAfectiva") {
      if (input.trabaAfectiva && !value) {
        setError({ ...error, trabaAfectiva: "si desea eliminar la fecha de medida cautelar debe marcar 'no' " })
      }
      if (!input.trabaAfectiva && value) {
        setError({ ...error, trabaAfectiva: "debe ingresar seleccionar 'si'" })
      }
      if (input.trabaAfectiva && value) {
        setError({ ...error, vtoTrabaAfectiva: "", trabaAfectiva: "" })
      }
      if (!input.trabaAfectiva && !value) {
        setError({ ...error, vtoTrabaAfectiva: "", trabaAfectiva: "" })
      }
    }
  }
  const handleChange = function (e) {
    e.preventDefault()
    if (e.target.name === "vtoMedidaCautelar" || e.target.name === "vtoTrabaAfectiva") {
      setInput({ ...input, [e.target.name]: e.target.value })
      validate(e.target.name, e.target.value)
    } else {
      setInput({ ...input, [e.target.name]: e.target.value === "si" ? true : false })
      validate(e.target.name, e.target.value === "si" ? true : false)
    }
  }
  console.log(input)
  return (
    <div className="container">
      <div className="accordion accordion-flush ancho" id="accordionFlushExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id={"a" + cliente}>
            <button
              className="accordion-button collapsed mb-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={"#e" + cliente}
              aria-expanded="false"
              aria-controls={"e" + { cliente }}
            >
              <b>Crear Caso</b>
            </button>
          </h2>

          <div id={'e' + cliente} className="accordion-collapse collapse" aria-labelledby={'a' + cliente} data-bs-parent="#accordionFlushExample">
            <form className="list-group mb-3" onSubmit={handleSubmit}>
              <li>Juez:<input className="list-group-item w-25 " value={input.juez} onChange={e => setInput({ ...input, juez: e.target.value })} /></li>

              <li>Estado:<br />
                <select defaultValue={input.estado} className="custom-select form-select custom-select-lg mb-3 w-25" onChange={e => setInput({ ...input, estado: e.target.value })}>
                  <option value={null}>Seleccione un estado</option>
                  <option value={"inicio"} >inicio</option>
                  <option value={"prueba"}>prueba</option>
                  <option value={"sentencia"}>sentencia</option>
                </select>
              </li>

              <li>Juzgado:<input type="number" className="list-group-item w-25" value={input.juzgado} onChange={e => setInput({ ...input, juzgado: e.target.value })} /></li>
              Detalles:<input className="list-group-item w-100 w-25" value={input.detalle} onChange={e => setInput({ ...input, detalle: e.target.value })} />
              <p className="text-danger"> {error.detalle}</p>
              <li>N° Expediente:<input type={"number"} className="list-group-item w-25" value={input.numeroExpediente} onChange={e => setInput({ ...input, numeroExpediente: e.target.value })} /></li>
              {/* <li>N° Liquidacion:<input className="list-group-item w-25" value={input.numeroLiquidacion} disabled onChange={e => setInput({ ...input, numeroLiquidacion: e.target.value })} /></li> */}
              <li>Medida Cautelar: <br />
                <select name="medidaCautelar" className="custom-select form-select custom-select-lg mb-3 w-25" onChange={e => handleChange(e)}>
                  <option value="no">no</option>
                  <option value="si" >si</option>
                </select>
              </li>
              <p className="text-danger">{error.medidaCautelar}</p>
              <li>Vencimiento Medida Cautelar:<input className="list-group-item w-25" type={"date"} value={input.vtoMedidaCautelar} name={"vtoMedidaCautelar"} onChange={e => handleChange(e)} /></li>
              <p className="text-danger">{error.vtoMedidaCautelar}</p>
              <li><label >Traba Afectiva:</label> <br />
                <select name="trabaAfectiva" className="custom-select form-select custom-select-lg mb-3 w-25" onChange={e => handleChange(e)}>
                  <option value="no">no</option>
                  <option value="si" >si</option>
                </select></li>
              <p className="text-danger">{error.trabaAfectiva}</p>
              <li>Vencimiento Traba Afectiva:<input placeholder="2000-12-30" type={"date"} className={"list-group-item w-25"} value={input.vtoTrabaAfectiva} name={"vtoTrabaAfectiva"} onChange={e => handleChange(e)} /></li>
              <p className="text-danger">{error.vtoTrabaAfectiva}</p>
              <li>jurisdiccion:<input type={"text"} className="list-group-item w-25" value={input.jurisdiccion} onChange={e => setInput({ ...input, jurisdiccion: e.target.value })} /></li>
              {
                <li>Materia:<br />
                  <select className="custom-select form-select custom-select-lg mb-3 w-25" onChange={e => setInput({ ...input, materia: e.target.value })}>
                    <option value={null}>Seleccione una materia</option>
                    {
                      materias.map(e => (<option value={e.nombre}>{e.nombre}</option>))

                    }
                  </select>
                </li>
              }
              <p className="text-danger">{error.materia}</p>
              {
                error.medidaCautelar !== "" || error.trabaAfectiva !== "" || error.vtoMedidaCautelar !== "" || error.vtoTrabaAfectiva !== "" || !input.detalle || !input.materia === "Seleccione una materia" || !input.estado === "Seleccione un estado" ?
                  <div className="d-flex justify-content-center">
                    <button className="btn btn-primary d-flex justify-content-center mt-3 mb-3" type="submit" disabled>guardar</button>

                  </div> :
                  <div className="d-flex justify-content-center">
                    <button className="btn btn-primary d-flex justify-content-center mt-3 mb-3" type="submit" >guardar</button>

                  </div>
              }
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormCasos;