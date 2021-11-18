const { Router } = require("express");
const get = require("../controllers/gets");
const post = require("../controllers/post");
const del = require("../controllers/delete");
const put = require("../controllers/put");
const router = Router();

router.get("/resenas", (req, res, next) => get.getreseñas(req, res, next));

router.post("/resenas", (req, res, next) => post.setReseña(req, res, next));
// router.delete("/reseñas", (req, res, next) =>
//   del.deleteConsulta(req, res, next)
// );
// router.put("/reseñas", (req, res, next) => put.asignaConsulta(req, res, next));

module.exports = router;
