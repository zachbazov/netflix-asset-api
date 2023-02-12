const mongoose = require("mongoose");

// MARK: - Logo Schema

const logoSchema = new mongoose.Schema({
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

logoSchema.index({ name: 1 });
logoSchema.index({ type: 1 });
logoSchema.index({ dataUri: 1 });

// MARK: - Logo Model

const Logo = mongoose.model("Logo", logoSchema);

module.exports = Logo;
