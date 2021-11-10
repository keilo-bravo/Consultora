import React from 'react'

const EstadoSelect = ({ handlerEstado }) => {
    return (
        <>
            <select onChange={handlerEstado}>
                <option disabled>Seleccione el Estado</option>
                <option value="inicio">Inicio</option>
                <option value="prueba">Prueba</option>
                <option value="sentencia">Sentencia</option>
                <option value="cerrado">Cerrado</option>
            </select>
        </>
    )
}

export default EstadoSelect;
