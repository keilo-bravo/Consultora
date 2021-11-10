const { Router } = require('express');
const get = require("../controllers/gets")
const post = require("../controllers/post")
const put = require("../controllers/put")

const { Abogado, Cliente, Usuario } = require("../db")


const router = Router();
router.get("/usuarios", (req, res) => get.getUsuarios(req, res)) // get all users 

/* router.put("/usuario", (req, res) => get.getUsuario(req, res)) */ // get user(for login)
// router.put("/usuario", (req, res) => get.getUsuario(req, res)) // get user(for login)

router.get("/abogado/:slug", (req, res) => get.getAbogado(req, res)) // get abogado

router.post("/cliente", async function (req, res) {    // set client to abogado
    const { cliente, abogado } = req.body
    try {
        let { abogadoId } = await Usuario.findByPk(abogado)
        let { clienteId } = await Usuario.findByPk(cliente)

        let clienteAux = await Cliente.findByPk(clienteId)
        let abogadoAux = await Abogado.findByPk(abogadoId)
        if (clienteAux, abogadoAux) {
            abogadoAux.addClientes(clienteAux)
            res.sendStatus(200)
        } else res.sendStatus(404)
    } catch (error) {
        console.log(error)
        res.sendStatus(404)
    }
})

router.put("/bann", put.setBann)//bannea usuario

router.post("/usuario", (req, res) => post.setUsuarios(req, res))  //crea usuario

router.post("/forzar-reinicio-password", (req, res) => post.reiniciarPassword(req, res))  

router.put("/usuario", (req, res) => put.usuario(req, res)); // get  user(for login)

router.post("/persona", (req, res) => post.setPersona(req, res)); //crea persona

router.get("/personas", (req, res) => get.getPersonas(req, res)); //busca personas

router.post("/usuario/abogado", (req, res) => post.setAbogado(req, res)); //set abogado

router.get("/abogados", (req, res) => get.getAbogados(req, res)); // get  abogados

router.get("/personas", (req, res) => get.getPersonas(req, res)); // get  personas

// router.get("/abogado/:eMail", (req, res) => get.getAbogado(req, res)); // get  abogado

router.put("/abogado", (req, res) => put.getAbogado(req, res)); // get  abogado

router.post("/adm", (req, res) => post.setAdmin(req, res))


router.put("/abogado/:eMail", (req, res) => put.modificarAbogado(req, res)); // modificar abogado, actualizar foto etc



module.exports = router; 
