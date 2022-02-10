const { Schema, model } = require("mongoose");

const MessageSchema = new Schema(
    {
        createdAt: Number,
        updatedAt: Number,
        roomId: {
            type: Schema.Types.ObjectId,
            ref: "ChatRoom",
            required: [true, "The room id is required"],
        },
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "The sender id is required"],
        },
        body: {
            type: String,
            required: [true, "The message body is required"],
        },
    },
    { timestamps: true }
);

const Message = model("Message", MessageSchema);
module.exports = { Message };
