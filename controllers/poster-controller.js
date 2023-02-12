const Poster = require("../models/poster-model");
const handlerFactory = require("../utils/handler-factory");

// MARK: - CRUD Operations

exports.get = handlerFactory.get(Poster);
exports.create = handlerFactory.create(Poster);
exports.update = handlerFactory.update(Poster);
exports.delete = handlerFactory.deleteOne(Poster);
exports.deleteAll = handlerFactory.deleteAll(Poster);
