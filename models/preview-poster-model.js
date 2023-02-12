const mongoose = require("mongoose");

// MARK: - Preview Poster Schema

const previewPosterSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
    type: String,
    output: {
        dataUri: {
            type: Buffer,
            unique: true,
        },
    },
});

// MARK: - Improve Read Performance

previewPosterSchema.index({ name: 1 });
previewPosterSchema.index({ type: 1 });
previewPosterSchema.index({ dataUri: 1 });

// MARK: - Preview Poster Model

const PreviewPoster = mongoose.model("Preview-Poster", previewPosterSchema);

module.exports = PreviewPoster;
