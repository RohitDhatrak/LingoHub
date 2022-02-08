const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { routeNotFound } = require("./middlewares/route-not-found.middleware");
const { errorHandler } = require("./middlewares/error-handler.middleware");
const { initializeDBConnection } = require("./db/db.connect");

const port = process.env.PORT || 4444;
const whitelist = ["https://enwise.netlify.app"];
const corsOptions = {
    origin: whitelist,
    optionsSuccessStatus: 200,
    credentials: true,
};

const app = express();
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
// app.use("/video", video);

/* Error handlers do not move should be at the end*/
app.use(routeNotFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log("server started on port " + port);
});
