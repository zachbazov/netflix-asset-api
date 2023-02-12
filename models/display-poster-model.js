const mongoose = require("mongoose");

// MARK: - Display Poster Schema

const displayPosterSchema = new mongoose.Schema({
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

displayPosterSchema.index({ name: 1 });
displayPosterSchema.index({ type: 1 });
displayPosterSchema.index({ dataUri: 1 });

// MARK: - Display Poster Model

const DisplayPoster = mongoose.model("Display-Poster", displayPosterSchema);

module.exports = DisplayPoster;
