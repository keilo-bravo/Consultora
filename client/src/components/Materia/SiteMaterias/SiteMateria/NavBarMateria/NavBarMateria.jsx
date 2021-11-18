import React from 'react'
import LogoAzul from '../../../../home-page/assets/img/logo-sin-fondo-azul.png'
import { useHistory } from 'react-router'

const NavBarMateria = () => {
    const history = useHistory()
    return (
        <>
            <button onClick={() => history.goBack()}>Volver</button>
            <h2>Buffet Law</h2>
            <img src={LogoAzul} alt="Logo" />
        </>
    )
}

export default NavBarMateria;
