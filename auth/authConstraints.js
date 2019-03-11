const Users = require("../users/usersModel.js");

module.exports = authConstraints;

// Splits to two smaller functions to separately check for duplicate username and email
async function authConstraints(req, res, next) {
  const { username, password, first_name, last_name, email } = req.body;
  if (!username || !password || !first_name || !last_name || !email) {
    return res.status(406).json({
      error: true,
      user: {},
      message: "Please include required credentials and try again."
    });
  }
  const usernameCheck = await checkForUsername(req.body.username);
  const emailCheck = await checkForEmail(req.body.email);
  if (usernameCheck && emailCheck) {
    res.status(409).json({
      error: true,
      usernameError: true,
      emailError: true,
      message: "Sorry, that username and email already exist."
    });
  } else if (usernameCheck) {
    res.status(409).json({
      error: true,
      usernameError: true,
      emailError: false,
      message: "Sorry, that username already exists."
    });
  } else if (emailCheck) {
    res.status(409).json({
      error: true,
      usernameError: false,
      emailError: true,
      message: "Sorry, that email already exists."
    });
  } else {
    next();
  }
}

async function checkForUsername(username) {
  const foundUsername = await Users.find().where({ username });
  return foundUsername.length ? true : false;
}

async function checkForEmail(email) {
  const foundEmail = await Users.find().where({ email });
  return foundEmail.length ? true : false;
}
