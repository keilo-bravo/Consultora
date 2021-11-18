import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import { actionCancelarTurno, getAbogados } from '../../../redux/actions';
import UsuarioNavBar from '../usuarioNavBar/UsuarioNavBar';

import './turnosUsuario.css'

const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };


export default function TurnosUsuario() {

    const dispatch = useDispatch();

    const { usuario } = useSelector(state => state);

    const [abogados, setAbogados] = useState([]);
    const [diasDisponibles, setDiasDisponibles] = useState([]);
    const [turnosDisponibles, setTurnosDisponibles] = useState([]);
    const [turnoConfirmado, setTurnoConfirmado] = useState('')
    const [abogadoBuscado, setAbogadoBuscado] = useState('')
    const [diaSeleccionado, setDiaSeleccionado] = useState({})

    useEffect(() => {
        axios.get('/abogados-cliente', { params: { clienteId: usuario.clienteId } }).then(({ data }) => {
            setAbogados(data);
        }).catch(err => console.log(err));
    }, []);


    useEffect(() => {
        axios.get('/turno', { params: { clienteId: usuario.clienteId } }).then(({ data }) => {
            setTurnoConfirmado({ turnoId: data.turno.id, fecha: data.dia.fecha, hora: data.turno.hora });
        }).catch(err => console.log(err));
    }, []);

    function seleccionarAbogado(e) {
        setAbogadoBuscado(e.target.value)


        getTurnosAbogado(e.target.value);
    };

    function getTurnosAbogado(abogadoId) {
        axios.get('/dias', { params: { abogadoId: abogadoId } }).then(({ data }) => {
            if (data.length) {
                setDiasDisponibles(data);
                setAbogadoBuscado(abogadoId)
            } else {
                setDiasDisponibles([])
                setTurnosDisponibles([])
            }
        })
    };

    function seleccionarDia(e) {
        setDiaSeleccionado(JSON.parse(e.target.value))
        let { turnos } = JSON.parse(e.target.value);
        // console.log(e.target.value);
        setTurnosDisponibles(turnos);
    };


    function confirmarTurno(turno) {
        swal(!turnoConfirmado ? {
            title: "Confirmar",
            text: "¿Quiere confirmar el turno?",
            icon: "info",
            buttons: true,
        }
            :
            {
                title: "IMPORTANTE",
                text: "Ya tiene un turno asignado, ¿desea reemplazaralo?",
                icon: "warning",
                buttons: true,
            }
        ).then((willDelete) => {
            if (willDelete) {
                axios.post('/confirmar-turno', { clienteId: usuario.clienteId, turnoId: turno.id, fecha: diaSeleccionado.fecha }).then(data => {
                    toast.success('Turno confirmado')
                    setTurnoConfirmado({ turnoId: turno.id, hora: turno.hora, fecha: diaSeleccionado.fecha });
                }).catch(error => {
                    console.log(error);
                    if (error.response.status === 400) return toast.warning('El turno fue tomado. Intente con otro turno');
                });
            }
        });
    };

    function cancelarTurno(turnoId) {
        swal({
            title: "Cancelar",
            text: "¿Quiere cancelar su turno?",
            icon: "warning",
            buttons: true,
        }
        ).then((willDelete) => {
            if (willDelete) {
                dispatch(actionCancelarTurno(turnoId));
                toast.success('El turno fue cancelado')
                setTurnoConfirmado('');
            }
        }).catch(err => toast.error('Ocurrió un problema al cancelar el turno'));
    };



    return (<>
        <UsuarioNavBar></UsuarioNavBar>


        <div className="container bg-light shadow mt-5 p-3">


            <h1>Turnos</h1>
            <hr></hr>


            <div className="row mt-5">
                <div className="col-sm-12 col-md-3">


                    <select className="form-select pointer" onChange={(e) => seleccionarAbogado(e)}>
                        <option value="-1">Seleccionar abogado</option>
                        {
                            abogados?.map((abogado) => {
                                return <option key={abogado.id} value={abogado.id} >{abogado.persona.firstName} {abogado.persona.lastName}</option>
                            })
                        }
                    </select>


                    {
                        parseInt(abogadoBuscado) >= 0 && diasDisponibles.length > 0 ?

                            <select name="" id="" className="form-select pointer my-2" onChange={(e) => seleccionarDia(e)}>
                                <option value="-2">Seleccionar fecha</option>

                                {
                                    diasDisponibles?.map(turnoDisp => {
                                        return <option key={turnoDisp.id} value={JSON.stringify(turnoDisp)} className="text-capitalize">{new Date(turnoDisp.fecha).toLocaleDateString('es-ES', options)}</option>
                                    })
                                }
                            </select>
                            :
                            parseInt(abogadoBuscado) >= 0 ?
                                <h5 className="text-center text-muted mt-5">No hay turnos disponibles</h5>
                                :
                                ''
                    }

                    

                </div>

                <div className="col">

                    {turnosDisponibles?.length > 0 ?

                        <ul className="list-group overflow text-center">
                            {turnosDisponibles?.sort((a, b) => a.hora < b.hora ? -1 : (a.hora > b.hora ? 1 : 0)).map((turnoDisp) => {
                                return <li key={turnoDisp.hora} className={`list-group-item w-75 mb-2  row p-3 shadow ${turnoDisp.id === turnoConfirmado.turnoId ? 'border border-primary shadow' : 'border-0'}`}>
                                    <span className="bdg bg-light border shadow py-1">{turnoDisp.hora}</span>
                                    {/* <label className="form-label my-2">Mensaje opcional para el abogado</label>
                                    <input type="text" className="form-control mb-2" disabled={turnoDisp.id === turnoConfirmado.turnoId} /> */}
                                    <button className="btn btn-primaryNuestro mt-3 " onClick={() => confirmarTurno(turnoDisp)} disabled={turnoDisp.id === turnoConfirmado.turnoId}>Confirmar</button>
                                </li>
                            })
                            }
                        </ul>

                        :

                        <h5 className="text-center text-muted">Seleccione un abogado para ver su disponibilidad</h5>

                    }




                </div>

                {turnoConfirmado &&
                    <div className="col">
                        <div className="card shadow">
                            <div className="card-header bg-white"><p className="fs-5 card-title">Turno confirmado</p></div>
                            <div className="card-body">
                                <p>Su turno es el <b>{new Date(turnoConfirmado.fecha).toLocaleDateString()}</b> a las <b>{turnoConfirmado?.hora}</b> hs. </p>
                                <p>Al seleccionar un nuevo turno cancelará este automáticamente. </p>
                                <p>O puede cancelarlo, sin la necesidad de tomar un nuevo turno, haciendo click en el botón <i>'cancelar'</i>.</p>
                            </div>
                            <div className="card-footer text-center bg-white">
                                <button className="btn btn-dangerNuestro" onClick={() => cancelarTurno(turnoConfirmado.turnoId)}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                }

            </div>
        </div>

    </>)

};