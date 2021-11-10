const { Router } = require("express");
const get = require("../controllers/gets");
const post = require("../controllers/post");
const del = require("../controllers/delete");
const put = require("../controllers/put");
const router = Router();

router.get("/consultas", (req, res, next) => get.getConsultas(req, res, next));
router.post("/consultas", (req, res, next) => post.setConsulta(req, res, next));
router.delete("/consultas/:id", (req, res, next) =>
  del.deleteConsulta(req, res, next)
);
router.put("/consultas", (req, res, next) =>
  put.asignaConsulta(req, res, next)
);

module.exports = router;
