const { Schema, model } = require("mongoose");
const { isEmail } = require("validator");

const UserSchema = new Schema(
    {
        createdAt: Number,
        updatedAt: Number,
        name: {
            type: String,
            required: [true, "User's name is required"],
        },
        email: {
            type: String,
            required: [true, "User's email-id is required"],
            unique: true,
            validate: [isEmail, "Please enter a valid email address"],
        },
        profilePicture: {
            type: String,
            required: [true, "User's profile pic is required"],
        },
        known: [String],
        learning: [String],
        partners: [{ type: Schema.Types.ObjectId, ref: "User" }],
        bio: String,
        hobbies: String,
        isOnline: {
            type: Boolean,
            required: [true, "User's isOnline status is required"],
        },
    },
    { timestamps: true }
);

const User = model("User", UserSchema);
module.exports = { User };
