import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putCaso } from "../../../redux/actions";
import { toast } from "react-toastify";



export default function CardCasos({ detalle, estado, juez, juzgado, numeroExpediente, numeroLiquidacion, medidaCautelar, trabaAfectiva, vtoMedidaCautelar, vtoTrabaAfectiva, jurisdiccion, flag, materia }) {
    const dispatch = useDispatch()
    const { materias } = useSelector(state => state)
    if (trabaAfectiva === null) trabaAfectiva = false
    if (medidaCautelar === null) medidaCautelar = false
    const [input, setInput] = useState({
        detalle: detalle,
        estado: estado,
        juez: juez,
        juzgado: juzgado,
        numeroExpediente: numeroExpediente,
        numeroLiquidacion: numeroLiquidacion,
        medidaCautelar: medidaCautelar,
        trabaAfectiva: trabaAfectiva,
        vtoMedidaCautelar: vtoMedidaCautelar,
        vtoTrabaAfectiva: vtoTrabaAfectiva,
        jurisdiccion: jurisdiccion,
        materia: materia

    })
    const [error, setError] = useState({

        medidaCautelar: "",
        trabaAfectiva: "",
        vtoMedidaCautelar: "",
        vtoTrabaAfectiva: "",

    })

    const handleSubmit = function (e) {
        e.preventDefault()
        dispatch(putCaso(input))
        toast.success('cambios realizados!');
    }
    const validate = function (name, value) {
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
                setError({ ...error, medidaCautelar: "si desea ingresar una fecha de medida cautelar debe marcar 'si' " })
            }
            if (!input.medidaCautelar && value) {
                setError({ ...error, vtoMedidaCautelar: "debe ingresar una fecha o seleccionar 'no'" })
            }
            if (input.medidaCautelar && value) {
                setError({ ...error, vtoMedidaCautelar: "", medidaCautelar: "" })
            }
            if (!input.medidaCautelar && !value) {
                setError({ ...error, vtoMedidaCautelar: "", medidaCautelar: "" })
            }
        } else if (name === "vtoTrabaAfectiva") {
            console.log(!!input.trabaAfectiva, input.vtoTrabaAfectiva)

            if (input.trabaAfectiva && !value) {
                setError({ ...error, vtoTrabaAfectiva: "debe ingresar una fecha o seleccionar 'no'" })
            }
            if (!input.trabaAfectiva && value) {
                console.log("vtoTrabaAfectiva y no trabaAfectiva")
                setError({ ...error, trabaAfectiva: "si desea ingresar una fecha de trava afectiva debe marcar 'si'" })
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
        flag ?
            <div className="container">
                <div className="accordion accordion-flush ancho" id="accordionFlushExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id={'a' + numeroLiquidacion}>
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={'#e' + numeroLiquidacion} aria-expanded="false" aria-controls={'e' + numeroLiquidacion}>
                                <b>N° Liquidacion: {numeroLiquidacion}</b>
                            </button>
                        </h2>
                        <div id={'e' + numeroLiquidacion} className="accordion-collapse collapse" aria-labelledby={'a' + numeroLiquidacion} data-bs-parent="#accordionFlushExample">
                            <form className="list-group" onSubmit={handleSubmit}>
                                <li>Juez:<input className="list-group-item w-25" value={input.juez} onChange={e => setInput({ ...input, juez: e.target.value })} /></li>
                                {estado === "inicio" ?
                                    <li>Estado:<br />
                                        <select defaultValue={input.estado} className="custom-select custom-select-lg mb-3 w-25" onChange={e => setInput({ ...input, estado: e.target.value })}>
                                            <option value={"inicio"} selected>inicio</option>
                                            <option value={"prueba"}>prueba</option>
                                            <option value={"sentencia"}>sentencia</option>
                                            <option value={"cerrado"}>cerrado</option>
                                        </select>
                                    </li> : estado === "prueba" ?
                                        <li>Estado:<br />
                                            <select defaultValue={input.estado} className="custom-select custom-select-lg mb-3 w-25" onChange={e => setInput({ ...input, estado: e.target.value })}>
                                                <option value={"inicio"}>inicio</option>
                                                <option value={"prueba"} selected>prueba</option>
                                                <option value={"sentencia"}>sentencia</option>
                                                <option value={"cerrado"}>cerrado</option>
                                            </select>
                                        </li> : estado === "sentencia" ? <li>Estado:<br />
                                            <select defaultValue={input.estado} className="custom-select custom-select-lg mb-3 w-25 " onChange={e => setInput({ ...input, estado: e.target.value })}>
                                                <option value={"inicio"}>inicio</option>
                                                <option value={"prueba"}>prueba</option>
                                                <option value={"sentencia"} selected>sentencia</option>
                                                <option value={"cerrado"}>cerrado</option>
                                            </select>
                                        </li> : <li>Estado:<br />
                                            <select defaultValue={input.estado} className="custom-select custom-select-lg mb-3 w-25" onChange={e => setInput({ ...input, estado: e.target.value })}>
                                                <option value={"inicio"}>inicio</option>
                                                <option value={"prueba"}>prueba</option>
                                                <option value={"sentencia"}>sentencia</option>
                                                <option value={"cerrado"} selected>cerrado</option>
                                            </select>
                                        </li>
                                }
                                <li>Juzgado:<input className="list-group-item w-25" value={input.juzgado} onChange={e => setInput({ ...input, juzgado: e.target.value })} /></li>
                                <li>Detalles:<input className="list-group-item w-100 w-25" value={input.detalle} onChange={e => setInput({ ...input, detalle: e.target.value })} /></li>
                                <li>N° Expediente:<input className="list-group-item w-25" value={input.numeroExpediente} onChange={e => setInput({ ...input, numeroExpediente: e.target.value })} /></li>
                                <li>N° Liquidacion:<input className="list-group-item w-25" value={input.numeroLiquidacion} disabled onChange={e => setInput({ ...input, numeroLiquidacion: e.target.value })} /></li>
                                {
                                    input.medidaCautelar ?
                                        <li>Medida Cautelar: <br /><select name="medidaCautelar" className="custom-select custom-select-lg mb-3 w-25" onChange={e => handleChange(e)}>
                                            <option value="si" selected>si</option>
                                            <option value="no">no</option>
                                        </select></li> : <li>Medida Cautelar: <br /><select name="medidaCautelar" className="custom-select custom-select-lg mb-3 w-25" onChange={e => handleChange(e)}>
                                            <option value="si" >si</option>
                                            <option value="no" selected>no</option>
                                        </select></li>
                                }
                                <p className="text-danger">{error.medidaCautelar}</p>
                                <li>Vencimiento Medida Cautelar:<input className="list-group-item w-25" type={"date"} value={input.vtoMedidaCautelar} name={"vtoMedidaCautelar"} onChange={e => handleChange(e)} /></li>
                                <p className="text-danger">{error.vtoMedidaCautelar}</p>
                                {
                                    input.trabaAfectiva ?
                                        <li><label >Traba Afectiva:</label> <br />
                                            <select name="trabaAfectiva" className="custom-select custom-select-lg mb-3 w-25" onChange={e => handleChange(e)}>
                                                <option value="si" selected>si</option>
                                                <option value="no">no</option>
                                            </select></li> : <li>Traba Afectiva: <br /><select name="trabaAfectiva" className="custom-select custom-select-lg mb-3 w-25" onChange={e => handleChange(e)}>
                                                <option value="si"  >si</option>
                                                <option value="no" selected>no</option>
                                            </select></li>
                                }
                                <p className="text-danger">{error.trabaAfectiva}</p>
                                <li>Vencimiento Traba Afectiva:<input placeholder="2000-12-30" type={"date"} className={"list-group-item w-25"} value={input.vtoTrabaAfectiva} name={"vtoTrabaAfectiva"} onChange={e => handleChange(e)} /></li>
                                <p className="text-danger">{error.vtoTrabaAfectiva}</p>
                                <li>jurisdiccion:<input className="list-group-item w-25" value={input.jurisdiccion} onChange={e => setInput({ ...input, jurisdiccion: e.target.value })} /></li>
                                {
                                    <li>Materia:<br />
                                        <select className="custom-select custom-select-lg mb-3 w-25" onChange={e => setInput({ ...input, materia: e.target.value })}>
                                            {
                                                materias.map(e => {
                                                    if (input.materia === e.nombre) {
                                                        return (<option value={e.nombre} selected>{e.nombre}</option>)
                                                    } else return (<option value={e.nombre}>{e.nombre}</option>)
                                                })

                                            }
                                        </select>
                                    </li>
                                }{
                                    error.medidaCautelar !== "" || error.trabaAfectiva !== "" || error.vtoMedidaCautelar !== "" || error.vtoTrabaAfectiva !== "" ?
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
            :
            <div className="container">
                <div className="accordion accordion-flush ancho" id="accordionFlushExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id={'a' + numeroLiquidacion}>
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={'#e' + numeroLiquidacion} aria-expanded="false" aria-controls={'e' + numeroLiquidacion}>
                                <b>N° Liquidacion: {numeroLiquidacion}</b>
                            </button>
                        </h2>
                        <div id={'e' + numeroLiquidacion} className="accordion-collapse collapse" aria-labelledby={'a' + numeroLiquidacion} data-bs-parent="#accordionFlushExample">
                            <ul className="list-group mb-3">
                                <li className="list-group-item">Juez: {input.juez}</li>
                                <li className="list-group-item">Estado: {input.estado}</li>
                                <li className="list-group-item">Juzgado: {input.juzgado}</li>
                                <li className="list-group-item">jurisdiccion: {input.jurisdiccion ? input.jurisdiccion : "ninguna"}</li>
                                <li className="list-group-item">N° Expediente: {input.numeroExpediente}</li>
                                <li className="list-group-item">N° Liquidacion: {input.numeroLiquidacion}</li>
                                <li className="list-group-item">Medida Cautelar: {input.medidaCautelar ? "si, hasta : " : "no"}{input.vtoMedidaCautelar ? input.vtoMedidaCautelar.slice(0, 10) : ""}</li>
                                <li className="list-group-item">Traba Afectiva: {input.trabaAfectiva ? "si, hasta : " : "no"}{input.vtoTrabaAfectiva ? input.vtoTrabaAfectiva : ""}</li>
                                <li className="list-group-item">Detalles: {input.detalle}</li>
                                <li className="list-group-item">Materia: {input.materia}</li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>)
}
