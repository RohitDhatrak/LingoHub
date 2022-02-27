const express = require("express");
const router = express.Router();
const { User } = require("../models/user.model");
const { ChatRoom } = require("../models/chatRoom.model");
const { Message } = require("../models/message.model");

router.route("/:roomId").post(async (req, res) => {
    try {
        const { roomId } = req.params;
        const { body, receiverId, senderId } = req.body;
        const room =
            roomId === "undefined" ? null : await ChatRoom.findById(roomId);
        const [user, partner] = await Promise.all([
            User.findById(senderId),
            User.findById(receiverId),
        ]);

        if (!user || !partner)
            return res.status(404).json({ message: "User not found" });

        if (!room) {
            try {
                const newRoom = new ChatRoom({
                    members: [senderId, receiverId],
                    messages: [],
                });

                user.partners.push(receiverId);
                partner.partners.push(senderId);

                const newMessage = new Message({
                    sender: senderId,
                    roomId: newRoom._id,
                    body,
                });

                newRoom.messages.push(newMessage._id);
                newRoom.unreadCount = [0, 1];

                await Promise.all([
                    user.save(),
                    partner.save(),
                    newMessage.save(),
                    newRoom.save(),
                    newRoom.populate("messages"),
                    newRoom.populate("members"),
                ]);

                res.status(200).json({
                    message: newMessage,
                    room: newRoom,
                });
            } catch (err) {
                res.status(500).json({
                    message: "There was some error while creating the room",
                    err,
                });
            }
        } else {
            const newMessage = new Message({
                sender: senderId,
                roomId: roomId,
                body,
            });

            room.messages.push(newMessage._id);
            const receiverIndex = room.members.findIndex(
                (member) => member.valueOf() === receiverId
            );
            room.unreadCount[receiverIndex] += 1;
            await Promise.all([newMessage.save(), room.save()]);
            res.status(200).json({ message: newMessage });
        }
    } catch (err) {
        res.status(500).json({
            message: "Some error occured while sending the message",
            err,
        });
    }
});

module.exports = router;
