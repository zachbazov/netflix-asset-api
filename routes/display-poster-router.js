const express = require("express");
const router = express.Router();

const displayPosterController = require("../controllers/display-poster-controller");

router
    .route("/")
    .get(displayPosterController.get)
    .post(displayPosterController.create)
    .patch(displayPosterController.update)
    .delete(displayPosterController.delete);

module.exports = router;
