const AppError = require("../utils/AppError");
const Image = require("../models/image-model");
const catchAsync = require("./../utils/catch-async");

// MARK: - Media

const getOverview = catchAsync(async (req, res, next) => {
    const allImages = await Image.find();
    const { page, limit } = req.query;
    const totalPages = Math.round(allImages.length / limit + 1);

    const images = await Image.find()
        .skip((page - 1) * limit)
        .limit(limit);

    res.status(200).render("overview", {
        title: "All Images",
        images,
        totalPages,
        page,
        limit,
    });
});

// MARK: - Images

const getImages = catchAsync(async (req, res, next) => {
    const images = await Image.find();

    res.status(200).render("images", {
        title: "Images",
        images,
    });
});

const getImage = catchAsync(async (req, res, next) => {
    const image = await Image.findOne({ name: req.query.name });

    res.status(200).render("image", {
        title: `${image.name}`,
        image,
    });
});

const uploadImage = catchAsync(async (req, res, next) => {
    res.status(200).render("image-upload", {
        title: "Image Upload",
    });
});

const cropImage = catchAsync(async (req, res, next) => {
    res.status(200).render("image-crop", {
        title: "Image Cropping",
    });
});

module.exports = {
    getOverview,
    getImages,
    getImage,
    uploadImage,
    cropImage,
};
