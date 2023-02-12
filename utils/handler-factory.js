const AppError = require("./AppError");
const APIService = require("../utils/APIService");
const catchAsync = require("./catch-async");

// MARK: - CRUD Operations

exports.get = (Model) =>
    catchAsync(async (req, res, next) => {
        let data;
        let query = Model.find();

        const service = new APIService(query, req.query)
            .filter()
            .sort()
            .limit()
            .limitFields()
            .paginate();

        data = await service.populate(Model);

        if (!data) {
            const message = `No ${Model.modelName} documents found.`;
            const appError = new AppError(message);
            return next(appError);
        }

        res.status(200).json({
            status: "success",
            results: data.length,
            data,
        });
    });

exports.create = (Model) =>
    catchAsync(async (req, res, next) => {
        let data = await Model.create({
            name: req.body.name,
            path: req.body.path,
            type: req.body.type,
            output: req.body.output,
        });

        if (!data) {
            const message = `Unable to create a ${Model.modelName} document.`;
            const appError = new AppError(message);
            return next(appError);
        }

        res.status(201).json({
            status: "success",
            data,
        });
    });

exports.update = (Model) =>
    catchAsync(async (req, res, next) => {
        let data = await Model.findOneAndUpdate(
            req.query.name !== undefined
                ? { name: req.query.name }
                : { _id: req.query._id },
            {
                name: req.body.name,
                path: req.body.path,
                type: req.body.type,
            },
            { new: true }
        );

        if (!data) {
            const message = "No documents found.";
            const appError = new AppError(message, 404);
            return next(appError);
        }

        res.status(200).json({
            status: "success",
            data,
        });
    });

exports.deleteOne = (Model) =>
    catchAsync(async (req, res, next) => {
        let data = await Model.findOne(
            req.query.name !== undefined
                ? { name: req.query.name }
                : { _id: req.query._id }
        );

        if (!data) {
            const message = `No ${Model.modelName} documents found.`;
            const appError = new AppError(message, 404);
            return next(appError);
        }

        await data.delete();

        res.status(204).json({
            status: "success",
            data: null,
        });
    });

exports.deleteAll = (Model) =>
    catchAsync(async (req, res, next) => {
        const data = await Model.deleteMany();

        if (!data) {
            const message = `Unable to delete ${Model.modelName} documents.`;
            const appError = new AppError(message, 404);
            return next(appError);
        }

        res.status(204).json({
            status: "success",
            data: null,
        });
    });
