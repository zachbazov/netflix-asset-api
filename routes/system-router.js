const express = require("express");
const router = express.Router();

const systemController = require("../controllers/system-controller");

router
    .route("/")
    .get(systemController.get)
    .post(systemController.create)
    .patch(systemController.update)
    .delete(systemController.delete);

module.exports = router;
