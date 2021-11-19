const { Router } = require('express');
const router = Router();
const post = require("../controllers/post")
const get = require("../controllers/gets")
const put = require("../controllers/put")

router.post("/tickets/new", (req, res) => post.postTickets(req, res));

router.get("/tickets", (req, res) => get.getTickets(req, res));

router.put("/tickets/edit", (req, res) => put.modificarTicket(req, res));

module.exports = router;