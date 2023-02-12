const express = require("express");
const router = express.Router();

const previewPosterController = require("../controllers/preview-poster-controller");

router
    .route("/")
    .get(previewPosterController.get)
    .post(previewPosterController.create)
    .patch(previewPosterController.update)
    .delete(previewPosterController.delete);

module.exports = router;
