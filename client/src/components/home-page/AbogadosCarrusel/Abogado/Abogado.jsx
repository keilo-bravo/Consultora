import React from 'react'
// import { Link } from 'react-router-dom';
import ButtonsNav from '../../../ButtonsNav/ButtonsNav';

const Abogado = ({ abogado, frase }) => {
    return (
        <>
            <div>
                <div className="img_abogado">
                    <img className="card-img-top" src={abogado.abogado.imagen} alt={'imagen'} />
                </div>
                <div className="text_equipo">
                    <p>{abogado.firstName} {abogado.lastName}</p>
                    <p>"{frase?.message}"</p>
                </div>
            </div>
            <div className="button_ver_mas">
                {/* <Link to={`/perfil/${abogado.slug}`}>
                    Ver más
                </Link> */}
                <ButtonsNav link={`/perfil/${abogado.slug}`} text="Ver más" />
            </div>
        </>
    )
}

export default Abogado;
