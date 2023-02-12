const mongoose = require("mongoose");

// MARK: - Poster Schema

const posterSchema = new mongoose.Schema({
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

posterSchema.index({ name: 1 });
posterSchema.index({ type: 1 });
posterSchema.index({ dataUri: 1 });

// MARK: - Poster Model

const Poster = mongoose.model("Poster", posterSchema);

module.exports = Poster;
