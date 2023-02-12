const express = require("express");
const router = express.Router();

const imageController = require("../controllers/image-controller");

router
    .route("/")
    .get(imageController.getAllImages)
    .post(imageController.createImage)
    .patch(imageController.updateImage)
    .delete(imageController.deleteImage);

module.exports = router;
