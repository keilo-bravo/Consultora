import React from 'react'
import { useHistory } from 'react-router'
const ButtonBack = ({ text, styleButton }) => {
    const history = useHistory()
    return (
        <>
            <button className={styleButton} onClick={() => history.goBack()}>{text}</button>
        </>
    )
}

export default ButtonBack
