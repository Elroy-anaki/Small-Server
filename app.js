// Import the modules
const express = require("express");
const env = require("dotenv");
const {
  getAllUsers,
  deleteUser,
  addUser,
  updateUser,
} = require("./Actions/CRUD");
let { usersList } = require("./Actions/CRUD");

// Define the app, the port and the database path
const app = express();
const PORT = Number(env.config().parsed.PORT);
const DB_PATH = String(env.config().parsed.DB_PATH);

// The GET requests
app.get("/", (req, res) => res.send(`Hello World!${DB_PATH}`));

app.get("/users", (req, res) => {
  usersList = getAllUsers(DB_PATH);
  res.send(usersList);
});

app.listen(PORT, () => console.log(`Server runs on port ${PORT} ...`));
