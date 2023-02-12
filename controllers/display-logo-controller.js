const DisplayLogo = require("../models/display-logo-model");
const handlerFactory = require("../utils/handler-factory");

// MARK: - CRUD Operations

exports.get = handlerFactory.get(DisplayLogo);
exports.create = handlerFactory.create(DisplayLogo);
exports.update = handlerFactory.update(DisplayLogo);
exports.delete = handlerFactory.deleteOne(DisplayLogo);
exports.deleteAll = handlerFactory.deleteAll(DisplayLogo);
