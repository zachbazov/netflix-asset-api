const express = require("express");
const router = express.Router();

const posterController = require("../controllers/poster-controller");

router
    .route("/")
    .get(posterController.get)
    .post(posterController.create)
    .patch(posterController.update)
    .delete(posterController.delete);

module.exports = router;
