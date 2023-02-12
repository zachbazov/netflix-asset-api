const DisplayPoster = require("../models/display-poster-model");
const handlerFactory = require("../utils/handler-factory");

// MARK: - CRUD Operations

exports.get = handlerFactory.get(DisplayPoster);
exports.create = handlerFactory.create(DisplayPoster);
exports.update = handlerFactory.update(DisplayPoster);
exports.delete = handlerFactory.deleteOne(DisplayPoster);
exports.deleteAll = handlerFactory.deleteAll(DisplayPoster);
