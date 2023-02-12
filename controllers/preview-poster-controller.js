const PreviewPoster = require("../models/preview-poster-model");
const handlerFactory = require("../utils/handler-factory");

// MARK: - CRUD Operations

exports.get = handlerFactory.get(PreviewPoster);
exports.create = handlerFactory.create(PreviewPoster);
exports.update = handlerFactory.update(PreviewPoster);
exports.delete = handlerFactory.deleteOne(PreviewPoster);
exports.deleteAll = handlerFactory.deleteAll(PreviewPoster);
