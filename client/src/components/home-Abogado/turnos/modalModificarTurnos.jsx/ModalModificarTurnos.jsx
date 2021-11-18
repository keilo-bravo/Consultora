import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import { actionCancelarTurno, getDia } from '../../../../redux/actions';


export default function ModalModificarTurnos({ getDias, mesActual, setDesde }) {

    const { dia } = useSelector(state => state);

    const dispatch = useDispatch();

    const [form, setForm] = useState({
        fecha: '',
        notaModificar: '',
        turnos: [
            { hora: '09:00' },
        ]
    });

    const { fecha, notaModificar } = form;


    useEffect(() => {
        // let fecha = new Date(dia?.dia?.fecha).toISOString().slice(0, 10);
        let fecha = `${new Date(dia?.dia?.fecha).getFullYear()}-${new Date(dia?.dia?.fecha).getMonth() + 1 < 10 ? '0' : ''}${new Date(dia?.dia?.fecha).getMonth() + 1}-${new Date(dia?.dia?.fecha).getDate() < 10 ? '0' : ''}${new Date(dia?.dia?.fecha).getDate()}`
        setForm({ fecha: fecha, notaModificar: dia?.dia?.nota, turnos: dia?.turnos })
    }, [dia]);
    // }, []);


    function handleForm(e) {
        if (e.target.className.includes('clase-turno')) {
            let copiaTurnos = [...turnos];
            copiaTurnos[Number(e.target.dataset.id)].hora = e.target.value;
            setForm({ ...form }, copiaTurnos);
        } else {
            setForm({ ...form, [e.target.name]: e.target.value })
        }

    }



    function submitForm(e) {
        e.preventDefault();
        axios.put('/dia', { diaId: dia?.dia?.id, form }).then(() => {
            toast.success('Día modificado')
            console.log(mesActual);
        }).then(() => {
            if (mesActual >= 0) {
                console.log('con mes');
                getDias(mesActual);
                // getDias(new Date(dia.dia.fecha).getMonth());
            } else {
                console.log('sin mes');
                getDias(undefined, 1, true);
            }
            setDesde(1)
        }).catch(err => toast.error('Hubo un problema al modificar los turnos'));
    };

    const { fechas, nota, turnos } = form;
    function añadirTurno() {
        turnos.push({ hora: '' })
        setForm({ ...form }, turnos);
    };

    function quitarTurno(i) {
        turnos.splice(i, 1)
        setForm({ ...form }, turnos)
    };


    function cancelarTurno(turno) {
        swal(turno.clienteId ?
            {
                title: "Cancelar y eliminar",
                text: "El turno se eliminará y el cliente será notificado por email ¿Continuar?",
                icon: "warning",
                buttons: true,
            }
            :
            {
                title: "Eliminar",
                text: "¿Eliminar turno?",
                icon: "info",
                buttons: true,
            }
        ).then((willDelete) => {
            if (willDelete) {
                dispatch(actionCancelarTurno(turno.id, true));
                toast.success('El turno fue cancelado');
                dispatch(getDia(dia?.dia?.id));
            }
        }).catch(err => toast.error('Ocurrió un problema al cancelar el turno'));
    };


    return (<>

        <div className="modal fade" id="modalModificarTurnos" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <form onSubmit={(e) => submitForm(e)}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modificar turnos {new Date(dia?.dia?.fecha).toLocaleDateString()}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <div className="row">
                                <div className="col">
                                    <label htmlFor="fecha" className="col-form-label pointer">Modificar fecha:
                                        {/* <span className="col-1 mx-2">📅</span> */}

                                    </label>
                                </div>

                                <div className="col-auto">
                                    <input value={fecha} name="fecha" type="date" id="fecha" onChange={(e) => handleForm(e)} className="form-control" />

                                </div>

                            </div>

                            <label className="form-label mt-2">Notas: </label>
                            <textarea type="text" name="notaModificar" value={notaModificar} className="form-control" onChange={(e) => handleForm(e)} placeholder="" />

                            <hr />

                            <div className="text-end">
                                <button type="button" className="btn btn-xs btn-primaryNuestro" onClick={añadirTurno}>+ Nuevo turno</button>
                            </div>

                            {
                                turnos?.map((turno, i) => {
                                    return <div key={i} className="row my-3 ">
                                        <div className="col-3">
                                            <label className="col-form-label"> Turno {i + 1} </label>
                                        </div>
                                        <div className="col mt-1">
                                            <span className="align-middle">{turno?.cliente?.persona?.firstName} {turno?.cliente?.persona?.lastName}</span>
                                        </div>
                                        <div className="col-3">
                                            <input className="form-control pointer clase-turno" type="time" min="09:00" max="18:00" data-id={i} value={turnos[i].hora} onChange={handleForm}></input>
                                        </div>

                                        {turno.id ?
                                            <button type="button" className="btn btn-dangerNuestro btn-sm col-1" onClick={() => cancelarTurno(turno)}>X</button>
                                            :
                                            <div className="col-auto align-middle text-center p-0">
                                                <span className="badge rounded-pill bg-light border shadow text-danger pointer fs-3 px-2 py-0 " onClick={() => quitarTurno(i)}> - </span>
                                            </div>
                                        }

                                    </div>
                                })

                            }

                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="submit" className="btn btn-primaryNuestro" data-bs-dismiss="modal">Guardar</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>

    </>)

};