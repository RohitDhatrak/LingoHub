const express = require("express");
const router = express.Router();
const { ChatRoom } = require("../models/chatRoom.model");

router
    .route("/:userId")
    .get(async (req, res) => {
        try {
            const { userId } = req.params;
            const rooms = await ChatRoom.find({ members: userId }).sort({
                updatedAt: -1,
            });
            const promises = rooms.map(async (room) =>
                room.populate("messages")
            );
            await Promise.all(promises);
            const promises2 = rooms.map(async (room) =>
                room.populate("members")
            );
            await Promise.all(promises2);

            res.status(200).json({ rooms });
        } catch (err) {
            res.status(500).json({
                message: "There was some error while getting the rooms",
                err,
            });
        }
    })
    .post(async (req, res) => {
        try {
            const { userId } = req.params;
            const { roomId } = req.body;
            const room = await ChatRoom.findById(roomId);
            if (!room)
                return res.status(404).json({ message: "Room not found" });
            const reqSenderIndex = room.members.findIndex(
                (member) => member.valueOf() === userId
            );
            const newUnreadCount = room.unreadCount;
            newUnreadCount[reqSenderIndex] = 0;
            await ChatRoom.updateOne(
                { _id: roomId },
                { $set: { unreadCount: newUnreadCount } },
                { timestamps: false }
            );
            res.status(200).json({ message: "Marked as read" });
        } catch (err) {
            res.status(500).json({
                message: "There was some error while marking the room as read",
                err,
            });
        }
    });

module.exports = router;
