const express = require("express");
const router = express.Router();

const displayLogoController = require("../controllers/display-logo-controller");

router
    .route("/")
    .get(displayLogoController.get)
    .post(displayLogoController.create)
    .patch(displayLogoController.update)
    .delete(displayLogoController.delete);

module.exports = router;
