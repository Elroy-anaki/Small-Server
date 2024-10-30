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

// ****************************************************************************************************************************************************************
// The middlewares

app.use(express.json())
app.use((req, res, next) => {
  usersList = getAllUsers(DB_PATH);
  next();
});

//TODO to connect this middleware to the put and delete
app.use((req, res, next) => {
  usersList = getAllUsers(DB_PATH);
  usersList.length === 0 ? res.send("There are no users") : next()

})

// ****************************************************************************************************************************************************************
// The GET requests
app.get("/", (req, res) => res.send(`Hello`));

// Get All Users OR By a Query
app.get(urls.getUrl.defult, (req, res) => {
  
  // Define a array with all the query params
  const queryParams = Object.keys(req.query);
  
  // Check if there are a query
  if (queryParams.length === 0) {
    res.send(usersList);
  } else {
    // Filter the users list
    const filteredUsers = usersList.filter((user) =>
      queryParams.every((param) => {
        if (!user.hasOwnProperty(param)) false;
        return typeof user[param] === "number"
        ? user[param] === Number(req.query[param])
        : user[param] === req.query[param];
      })
    );
    filteredUsers.length > 0
      ? res.send(filteredUsers)
      : res.send("There is no match");
    }
  });

  app.get(urls.getUrl.byParams, (req, res) => {
    const id = Number(req.params.id);
    const user = getUserById(usersList, id);
    res.send(user);
  });
  
  // ****************************************************************************************************************************************************************
  
  app.listen(PORT, () => console.log(`Server runs on port ${PORT} ...`));
