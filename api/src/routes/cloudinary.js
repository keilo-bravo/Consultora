const { Router } = require("express");
const get = require("../controllers/gets");
const post = require("../controllers/post");
const router = Router();


router.post("/subirimagen", (req, res, next) => post.subirImagen(req, res, next));
router.post("/eliminarimagen", (req, res, next) =>  post.eliminarImagen(req, res, next));


module.exports = router;