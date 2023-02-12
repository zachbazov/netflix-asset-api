const mongoose = require("mongoose");

// MARK: - System Schema

const systemSchema = new mongoose.Schema({
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

systemSchema.index({ name: 1 });
systemSchema.index({ type: 1 });
systemSchema.index({ dataUri: 1 });

// MARK: - System Model

const System = mongoose.model("System", systemSchema);

module.exports = System;
