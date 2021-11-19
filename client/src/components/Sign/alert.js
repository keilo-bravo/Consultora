import swal from 'sweetalert';

export const createOK = () => {
    swal({
        title: "Usuario Creado Exitosamente",
        text: '',
        icon: "success",
        button: "Aceptar"
    })

}

export const createNOOK = () => {
    swal({
        title: "Ups.. No se pudo crear el usuario",
        text: '',
        icon: "error",
        button: "Aceptar"
    })
}

export const correoNoOK = () => {
    swal({
        title: "Correo ya se encuentra registrado",
        text: '',
        icon: "warning",
        button: "Aceptar"
    })
}

export const dniNoOK = () => {
    swal({
        title: "DNI ya se encuentra registrado",
        text: '',
        icon: "warning",
        button: "Aceptar"
    })
}

export const sessionIN = () => {
    swal({
        title: "Bienvenido",
        text: '',
        icon: "success",
        button: "Aceptar"
    })
}

export const sessionOUT = () => {
    swal({
        title: "GOODBYE",
        text: '',
        icon: "warning",
        button: "Aceptar"
    })
}

export const usuarioBloqueado = () => {
    swal({
        title: "Usuario bloqueado",
        text: 'Su cuenta se encuentra bloqueada',
        icon: "error",
        button: "Aceptar"
    })
}

export const sessionERR = () => {
    swal({
        title: "Usuario o Contraseña incorrecta",
        text: '',
        icon: "error",
        button: "Aceptar"
    })
}

export const correoNo = () => {
    swal({
        title: "Ups.. No se pudo encontrar el usuario",
        text: '',
        icon: "error",
        button: "Aceptar"
    })
}

export const linkOK = () => {
    swal({
        title: "Solicitud aceptada",
        text: 'Por favor verificar su bandeja de correo',
        icon: "success",
        button: "Aceptar"
    })

}