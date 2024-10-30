// Import the modules
const express = require("express");
const env = require("dotenv");
const {
  getAllUsers,
  getUserById,
  deleteUser,
  addUser,
  updateUser,
} = require("./Actions/CRUD");
let { usersList } = require("./Actions/CRUD");
const { urls } = require("./URL/urls");

// Define the app, the port and the database path
const app = express();
const PORT = Number(env.config().parsed.PORT);
const DB_PATH = String(env.config().parsed.DB_PATH);

// The GET requests
app.get("/", (req, res) => res.send(`Hello`));



app.listen(PORT, () => console.log(`Server runs on port ${PORT} ...`));
