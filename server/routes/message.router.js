const express = require("express");
const router = express.Router();
const { User } = require("../models/user.model");
const { ChatRoom } = require("../models/chatRoom.model");
const { Message } = require("../models/message.model");

router
    .route("/:roomId")
    .get(async (req, res) => {
        try {
            const { roomId } = req.params;
            const room = await ChatRoom.find({ roomId });
            if (!room) {
                return res.status(404).json({
                    message: "Room not found",
                });
            }
            const messages = await Message.find({
                roomId: roomId,
            }).sort({ createdAt: -1 });
            res.status(200).json({ messages });
        } catch (err) {
            res.status(500).json({
                message: "There was some error while getting the messages",
            });
        }
    })
    .post(async (req, res) => {
        try {
            const { roomId } = req.params;
            const { body, partnerId, userId } = req.body;
            const room = await ChatRoom.findById(roomId);
            const user = await User.findById(userId);
            const partner = await User.findById(partnerId);

            if (!user || !partner)
                return res.status(404).json({ message: "User not found" });

            if (!room) {
                try {
                    const newRoom = new ChatRoom({
                        members: [userId, partnerId],
                        messages: [],
                    });
                    await newRoom.save();

                    user.partners.push(partnerId);
                    partner.partners.push(userId);
                    await user.save();
                    await partner.save();

                    const newMessage = new Message({
                        sender: userId,
                        roomId: newRoom._id,
                        body,
                        isRead: partner.isOnline ? true : false,
                    });
                    await newMessage.save();

                    newRoom.messages.push(newMessage._id);
                    await newRoom.save();
                    res.status(200).json({ message: newMessage });
                } catch (err) {
                    res.status(500).json({
                        message: "There was some error while creating the room",
                    });
                }
            } else {
                const newMessage = new Message({
                    sender: userId,
                    roomId: roomId,
                    body,
                    isRead: partner.isOnline ? true : false,
                });
                await newMessage.save();

                room.messages.push(newMessage._id);
                await room.save();
                res.status(200).json({ message: newMessage });
            }
        } catch (err) {
            res.status(500).json({
                message: "Some error occured while sending the message",
            });
        }
    });

module.exports = router;
