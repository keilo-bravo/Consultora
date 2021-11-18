const { Router } = require('express');
const get = require("../controllers/gets")
const post = require("../controllers/post")
const put = require("../controllers/put")

const router = Router();

router.get("/casos", get.getCasos)
router.post("/casos/new", post.setCasos)
router.put("/casos/put", put.putCaso)
router.get("/casos/all", get.getAllCasos)


module.exports = router; 