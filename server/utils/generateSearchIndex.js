const { Index } = require("flexsearch");
const { User } = require("../models/user.model");

const usersIndex = new Index({ tokenize: "forward" });

async function generateSearchIndex() {
    const users = await User.find();

    for (const user of users) {
        usersIndex.add(user._id.valueOf(), user.name.trim());
        if (user?.bio?.trim())
            usersIndex.append(user._id.valueOf(), user.bio.trim());
        if (user?.hobbies?.trim())
            usersIndex.append(user._id.valueOf(), user.hobbies.trim());
        if (user?.known.length !== 0) {
            for (const language of user.known) {
                usersIndex.append(user._id.valueOf(), language.trim());
            }
        }
        if (user?.learning.length !== 0) {
            for (const language of user.learning) {
                usersIndex.append(user._id.valueOf(), language.trim());
            }
        }
    }

    console.log("Search index generated successfully");
}

module.exports = {
    usersIndex,
    generateSearchIndex,
};
