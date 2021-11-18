const expresiones = {
    name: /^[a-zA-ZÀ-ÿ\s]/, // Letras y espacios, pueden llevar acentos y requiere solo 20 caracteres como max.
    num: /^\d{1,20}$/, //solo números
}

export const validate = (input) => {
    let errors = {};

    console.log(input.numeroLiquidacion)
    /* Verificacion de juez__________ */
    if (!input.juez) {
        errors.juez = 'Se requiere el juez por favor';
    } else if (!expresiones.name.test(input.juez)) {
        errors.juez = 'Se permiten solo letras por favor';
    }
    // } else if (!input.numeroLiquidacion) {                                       //Verificacion de numero de Liquidacion
    //     errors.numeroLiquidacion = 'Se requiere el numero de Liquidación';
    // } else if (!expresiones.num.test(input.numeroLiquidacion)) {
    //     errors.numeroLiquidacion = 'Se permiten solo números por favor';
    // }

    /* Verificacion de numero de expediente________ */
    // else if (!input.numeroExpediente) {
    //     errors.numeroExpediente = 'Se requiere el número de expediente por favor';
    // } else if (!expresiones.num.test(input.numeroExpediente)) {
    //     errors.numeroExpediente = 'Se permiten solo números con una cantidad máxima de 20 números';
    // }


    /* Verificacion de juzgado__________ */
    // else if (!input.juzgado) {
    //     errors.juzgado = 'Se requiere el Juzgado por favor'
    // } else if (!expresiones.num.test(input.juzgado)) {
    //     errors.juzgado = 'Se permiten solo números por favor';
    // }


    /* Verificacion de detalle del caso__________ */
    else if (!input.detalle) {
        errors.detalle = 'Se requiere el detalle del caso por favor';
    } /* else if (!expresiones.num.test(input.detalle)) {
        errors.detalle = 'Se permiten solo letras por favor';
    } */

    /* Verificacion de estado del caso______________ */
    else if (!input.estado) {
        errors.estado = 'Se requiere el estado del caso';
    }


    /* Verificacion del email________________ */
    else if (!input.eMail) {
        errors.eMail = 'Se requiere un email';
    }


    /* Verificacion de la medida Cautelar */
    // else if (!input.medidaCautelar) {
    //     errors.medidaCautelar = 'Se requiere el ingreso de la medida cautelar por favor';
    // }

    /* Verificacion de la traba afectiva */
    // else if (!input.trabaAfectiva) {
    //     errors.trabaAfectiva = 'Se requiere el ingreso de la traba afectiva por favor';
    // }

    /* Verificacion de la vtoMedidaCautelar */
    // else if (!input.vtoMedidaCautelar) {
    //     errors.vtoMedidaCautelar = 'Se requiere el ingreso de la VTO medida Cautelar por favor';
    // }

    /* Verificacion de la vtoTrabaAfectiva */
    // else if (!input.vtoTrabaAfectiva) {
    //     errors.vtoTrabaAfectiva = 'Se requiere el ingreso de la VTO Traba Afectiva por favor';
    // }

    /* Verificacion de la jurisdiccion */
    // else if (!input.jurisdiccion) {
    //     errors.jurisdiccion = 'Se requiere el ingreso de la jurisdiccion por favor';
    // }

    return errors;
}