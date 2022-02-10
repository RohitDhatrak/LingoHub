const express = require("express");
const cors = require("cors");
require("dotenv").config();
const socketio = require("socket.io");
const http = require("http");

const user = require("./routes/user.router");
const chatRoom = require("./routes/chatRoom.router");
const message = require("./routes/message.router");
const search = require("./routes/search.router");
const { routeNotFound } = require("./middlewares/route-not-found.middleware");
const { errorHandler } = require("./middlewares/error-handler.middleware");
const { initializeDBConnection } = require("./db/db.connect");
const { generateSearchIndex } = require("./utils/generateSearchIndex");
const { addUser, removeUser, getReceiver } = require("./utils/socket");

const port = process.env.PORT || 4444;
const whitelist = ["https://enwise.netlify.app"];
const corsOptions = {
    origin: whitelist,
    optionsSuccessStatus: 200,
    credentials: true,
};

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
    socket.on("saveUser", (userId) => addUser(userId, socket.id));
    socket.on("disconnect", () => removeUser(socket.id));
    socket.on("sendMessage", ({ message, receiverId, room }) => {
        const receiverSocketId = getReceiver(receiverId);
        if (message) {
            io.to(receiverSocketId).emit("getMessage", { message });
        }
        if (room) {
            io.to(receiverSocketId).emit("getMessage", { room });
        }
    });
});

app.use(express.json());
if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "production-test"
) {
    app.use(cors({ origin: true, credentials: true }));
} else {
    app.use(cors(corsOptions));
}

initializeDBConnection();

if (process.env.NODE_ENV !== "development") {
    app.use(auth);
}
app.use("/user", user);
app.use("/room", chatRoom);
app.use("/message", message);
app.use("/search", search);

/* Error handlers do not move should be at the end*/
app.use(routeNotFound);
app.use(errorHandler);

server.listen(port, () => {
    console.log("server started on port " + port);
});

generateSearchIndex();
