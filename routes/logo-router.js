const express = require("express");
const router = express.Router();

const logoController = require("../controllers/logo-controller");

router
    .route("/")
    .get(logoController.get)
    .post(logoController.create)
    .patch(logoController.update)
    .delete(logoController.delete);

module.exports = router;
