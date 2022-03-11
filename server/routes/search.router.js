const express = require("express");
const router = express.Router();
const { User } = require("../models/user.model");
const { usersIndex } = require("../utils/generateSearchIndex");

router.route("/").post(async (req, res) => {
    try {
        const { query } = req.body;
        const users = [...new Set(usersIndex.search(query))];
        const userDocs = [];
        for (const user of users) {
            const userDoc = await User.findOne({ _id: user });
            userDocs.push(userDoc);
        }
        res.status(200).json({ users: userDocs });
    } catch (err) {
        res.status(500).json({
            message: "There was some error while getting the users",
            err,
        });
    }
});

module.exports = router;
