const mongoose = require("mongoose");

// MARK: - Display Logo Schema

const displayLogoSchema = new mongoose.Schema({
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

displayLogoSchema.index({ name: 1 });
displayLogoSchema.index({ type: 1 });
displayLogoSchema.index({ dataUri: 1 });

// MARK: - Display Logo Model

const DisplayLogo = mongoose.model("Display-Logo", displayLogoSchema);

module.exports = DisplayLogo;
