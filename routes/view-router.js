const express = require("express");
const router = express.Router();

const viewController = require("../controllers/view-controller");

router.get("/", viewController.getOverview);

router.get("/images", viewController.getImages);

router.get("/image", viewController.getImage);

router.get("/upload", viewController.uploadImage);

router.get("/crop", viewController.cropImage);

module.exports = router;
