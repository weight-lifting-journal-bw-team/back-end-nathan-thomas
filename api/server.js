// Import dependencies and general middleware
const express = require("express");
const configureMiddleware = require("./middleware.js");
const server = express();
require("dotenv").config();

// Pass server through middleware file
configureMiddleware(server);

// Custom restricted middleware import
const restricted = require("../auth/restricted.js");

// Import various split API routes
// const workoutsRouter = require("../workouts/workoutsRouter.js");
const usersRouter = require("../users/usersRouter.js");
const authRouter = require("../auth/authRouter.js");

// Router assignments
// server.use("/api/restricted/workouts", restricted, workoutsRouter);
server.use("/api/restricted/users", restricted, usersRouter);
server.use("/api/auth", authRouter);

// Generic / route for initial server online status check
const projectName = process.env.PROJECT_NAME || "test";
server.get("/", (req, res) => {
  res.send(`The ${projectName} server is up and running!`);
});

// Server export to be used in index.js
module.exports = server;
