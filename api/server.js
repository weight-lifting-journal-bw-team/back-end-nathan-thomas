// Import dependencies and general middleware
const express = require("express");
const configureGeneralMiddleware = require("../common/generalMiddleware.js");
const server = express();
require("dotenv").config();

// Pass server through middleware file
configureGeneralMiddleware(server);

// Custom restricted middleware import
const restricted = require("../auth/restricted.js");

// Import various split API routes
const exercisesRouter = require("../exercises/exercisesRouter.js");
const journalRouter = require("../journals/journalsRouter.js");
const usersRouter = require("../users/usersRouter.js");
const dataRouter = require("../data/dataRouter.js");
const authRouter = require("../auth/authRouter.js");

// Router assignments
server.use("/api/restricted/exercises", restricted, exercisesRouter);
server.use("/api/restricted/journals", restricted, journalRouter);
server.use("/api/restricted/users", restricted, usersRouter);
server.use("/api/restricted/data", restricted, dataRouter);
server.use("/api/auth", authRouter);

// Generic / route for initial server online status check
const projectName = process.env.PROJECT_NAME || "test";
server.get("/", (req, res) => {
  res.send(`The ${projectName} server is running! 🔥`);
});

// Server export to be used in index.js
module.exports = server;
