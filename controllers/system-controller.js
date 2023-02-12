const System = require("../models/system-model");
const handlerFactory = require("../utils/handler-factory");

// MARK: - CRUD Operations

exports.get = handlerFactory.get(System);
exports.create = handlerFactory.create(System);
exports.update = handlerFactory.update(System);
exports.delete = handlerFactory.deleteOne(System);
exports.deleteAll = handlerFactory.deleteAll(System);
