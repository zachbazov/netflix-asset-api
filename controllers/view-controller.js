const Poster = require("../models/poster-model");
const Logo = require("../models/logo-model");
const DisplayPoster = require("../models/display-poster-model");
const DisplayLogo = require("../models/display-logo-model");
const PreviewPoster = require("../models/preview-poster-model");
const System = require("../models/system-model");
const catchAsync = require("./../utils/catch-async");

// MARK: - Media

const getOverview = catchAsync(async (req, res, next) => {
    const allPosters = await Poster.find();
    const { page, limit } = req.query;
    const totalPages = Math.round(allPosters.length / limit + 1);

    const posters = await Poster.find()
        .skip((page - 1) * limit)
        .limit(limit);

    res.status(200).render("overview", {
        title: "All Posters",
        posters,
        totalPages,
        page,
        limit,
    });
});

// MARK: - Poster

const getPosters = catchAsync(async (req, res, next) => {
    const posters = await Poster.find();

    res.status(200).render("posters", {
        title: "Posters",
        posters,
    });
});

const getPoster = catchAsync(async (req, res, next) => {
    const poster = await Poster.findOne({ name: req.query.name });

    res.status(200).render("poster", {
        title: `${poster.name}`,
        poster,
    });
});

const getLogos = catchAsync(async (req, res, next) => {
    const logos = await Logo.find();

    res.status(200).render("logos", {
        title: "Logos",
        logos,
    });
});

const getDisplayPosters = catchAsync(async (req, res, next) => {
    const displayPosters = await DisplayPoster.find();

    res.status(200).render("display-posters", {
        title: "Display Posters",
        displayPosters,
    });
});

const getDisplayLogos = catchAsync(async (req, res, next) => {
    const displayLogos = await DisplayLogo.find();

    res.status(200).render("display-logos", {
        title: "Display Logos",
        displayLogos,
    });
});

const getPreviewPosters = catchAsync(async (req, res, next) => {
    const previewPosters = await PreviewPoster.find();

    res.status(200).render("preview-posters", {
        title: "Preview Posters",
        previewPosters,
    });
});

const getSystems = catchAsync(async (req, res, next) => {
    const systems = await System.find();

    res.status(200).render("systems", {
        title: "Systems",
        systems,
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
    getPosters,
    getPoster,
    getLogos,
    getDisplayPosters,
    getDisplayLogos,
    getPreviewPosters,
    getSystems,
    uploadImage,
    cropImage,
};
