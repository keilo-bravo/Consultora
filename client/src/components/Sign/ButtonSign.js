import React from 'react'

const ButtonSign = ({ text, handle }) => {
    return (
        <>
            <button onClick={handle}>{text}</button>
        </>
    )
}

export default ButtonSign
