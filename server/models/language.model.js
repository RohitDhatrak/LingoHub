const { Schema, model } = require("mongoose");

const LanguageSchema = new Schema(
    {
        createdAt: Number,
        updatedAt: Number,
        name: {
            type: String,
            required: [true, "Language name is required"],
            unique: true,
        },
    },
    { timeseries: true }
);

const Language = model("Language", LanguageSchema);
module.exports = { Language };
