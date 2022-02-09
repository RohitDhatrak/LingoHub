const { Schema, model } = require("mongoose");

const ChatRoomSchema = new Schema(
    {
        createdAt: Number,
        updatedAt: Number,
        members: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: [true, "The member id is required"],
            },
        ],
        messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
        unreadCount: [Number],
    },
    { timestamps: true }
);

const ChatRoom = model("ChatRoom", ChatRoomSchema);
module.exports = { ChatRoom };
