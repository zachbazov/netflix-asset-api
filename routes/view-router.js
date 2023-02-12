const express = require("express");
const router = express.Router();

const viewController = require("../controllers/view-controller");

router.get("/", viewController.getOverview);

router.get("/posters", viewController.getPosters);
router.get("/poster", viewController.getPoster);

router.get("/logos", viewController.getLogos);

router.get("/display-posters", viewController.getDisplayPosters);

router.get("/display-logos", viewController.getDisplayLogos);

router.get("/preview-posters", viewController.getPreviewPosters);

router.get("/systems", viewController.getSystems);

router.get("/upload", viewController.uploadImage);

router.get("/crop", viewController.cropImage);

module.exports = router;
