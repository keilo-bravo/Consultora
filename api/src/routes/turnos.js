const { Router } = require('express');
const router = Router();
const post = require("../controllers/post")
const get = require("../controllers/gets")
const put = require("../controllers/put")
const del = require("../controllers/delete")

router.post("/dia", (req, res) => post.postDia(req, res));

router.put("/dia", (req, res) => put.modificarDia(req, res));

router.get("/dia", (req, res) => get.getDia(req, res));

router.get("/dias", (req, res) => get.getDias(req, res));

router.get("/turno", (req, res) => get.getTurno(req, res));

router.post("/confirmar-turno", (req, res) => post.confirmarTurno(req, res));

router.post("/cancelar-turno", (req, res) => del.cancelarTurno(req, res));

router.post("/eliminar-dia", (req, res) => del.eliminarDia(req, res));

// router.put("/dia", (req, res) => put.(req, res));

module.exports = router;