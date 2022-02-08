const express = require("express");
const router = express.Router();
const { User } = require("../models/user.model");
const { cloudinary } = require("../utils/cloudinary");

router.route("/").get(async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ users });
    } catch (err) {
        res.status(500).json({
            message: "There was some error while getting all the users",
        });
    }
});

router
    .route("/:email")
    .get(async (req, res) => {
        try {
            let { email } = req.params;
            email = email.toLowerCase();
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({
                    message: "User not found",
                });
            }
            const partnersHashMap = {};
            for (const partner of user.partners) {
                partnersHashMap[partner] = true;
            }
            res.status(200).json({ user: { ...user._doc, partnersHashMap } });
        } catch (err) {
            res.status(500).json({
                message: "There was some error while getting the user",
                err,
            });
        }
    })
    .post(async (req, res) => {
        try {
            let { email } = req.params;
            email = email.toLowerCase();
            const { name } = req.body;
            const profilePicture =
                "https://res.cloudinary.com/rohitdhatrak/image/upload/v1641039008/uctgqsdfcgesusplshme.png";
            const user = await User.findOne({ email });
            if (user) {
                return res.status(409).json({
                    message: "User already exists",
                });
            }
            const newUser = new User({
                email,
                name,
                profilePicture,
                isOnline: true,
            });
            await newUser.save();
            res.status(201).json({
                user: { ...newUser._doc, partnersHashMap: {} },
                message: "User created successfully",
            });
        } catch (err) {
            res.status(500).json({
                message: "There was some error while creating the user",
                err,
            });
        }
    })
    .patch(async (req, res) => {
        try {
            let { email } = req.params;
            email = email.toLowerCase();
            const { name, profilePicture, bio, hobbies, known, learning } =
                req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({
                    message: "User not found",
                });
            }

            if (profilePicture !== user.profilePicture) {
                const { url } = await cloudinary.uploader.upload(
                    profilePicture,
                    {
                        upload_preset: "social_media",
                    }
                );
                const imageId = user.profilePicture.split("/")[7].split(".")[0];
                if (imageId !== "uctgqsdfcgesusplshme")
                    await cloudinary.uploader.destroy(imageId);
                profilePicture = url;
                user.profilePicture = profilePicture;
            }

            user.name = name;
            user.bio = bio;
            user.hobbies = hobbies;
            user.known = known;
            user.learning = learning;
            await user.save();
            res.status(200).json({
                message: "User updated successfully",
            });
        } catch (err) {
            res.status(500).json({
                message: "There was some error while updating the user",
                err,
            });
        }
    });

module.exports = router;
