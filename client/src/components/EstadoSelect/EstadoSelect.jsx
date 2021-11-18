import React from 'react'

const EstadoSelect = ({ handlerEstado, className }) => {
    return (
        <>
            <select onChange={handlerEstado} className={className}>
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
