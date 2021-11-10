const { Router } = require('express');
const get = require("../controllers/gets")
const { Materias } = require("../db")


const router = Router();


router.get("/provincias", (req, res) => get.getProvincias(req, res))

router.get("/materias", get.getMaterias)




module.exports = router; 