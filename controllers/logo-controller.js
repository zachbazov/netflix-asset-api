const Logo = require("../models/logo-model");
const handlerFactory = require("../utils/handler-factory");

// MARK: - CRUD Operations

exports.get = handlerFactory.get(Logo);
exports.create = handlerFactory.create(Logo);
exports.update = handlerFactory.update(Logo);
exports.delete = handlerFactory.deleteOne(Logo);
exports.deleteAll = handlerFactory.deleteAll(Logo);
