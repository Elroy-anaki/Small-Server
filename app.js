// Import the modules
const express = require("express");
const cors = require("cors");
const env = require("dotenv");
const {
  updateFile,
  readFile,
  getUserById,
  deleteUser,
  addUser,
  updateUser,
} = require("./utils/CRUD");
let { usersList } = require("./utils/CRUD");
const { urls } = require("./URL/urls");
const {isUserExist} = require('./utils/someUtils')

// Define the app, the port and the database path
const app = express();
const PORT = Number(env.config().parsed.PORT);
const DB_PATH = String(env.config().parsed.DB_PATH);

// ****************************************************************************************************************************************************************
// The middlewares
app.use(cors())
app.use((express.json()))

app.use((req, res, next) => {
  usersList = readFile(DB_PATH);
  next();
});

// Middleware of PUT + DELETE
app.use([urls.putUrl.editUser, urls.deleteUrl.deleteUser, urls.getUrl.byParams], (req, res, next) => {
  usersList = readFile(DB_PATH);
  console.log(req.params.id)
  let userId; 
  (req.method === 'PUT') ? userId = req.body.id : userId = req.params.id;
  
  (!isUserExist(usersList, Number(userId)))
   ? res.send({mes:"There is no user with this id"}) : next();

});


// ****************************************************************************************************************************************************************
// The GET requests
app.get("/", (req, res) => res.send(req.method));

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
      : res.send({mes:"There is no match"});
    }
  });

  app.get(urls.getUrl.byParams, (req, res) => {
    const id = Number(req.params.id);
    const user = getUserById(usersList, id);
    res.send(user);
  });

  
  // ****************************************************************************************************************************************************************
  // The POST request
  app.post('/addUser', (req, res) => {
    addUser(usersList, req.body, DB_PATH)
    res.send("The user added successfully")
  });


// ****************************************************************************************************************************************************************
// The PUT request
app.put(urls.putUrl.editUser, (req, res) => {
  const user = req.body
  updateUser(usersList, user, user.id, DB_PATH);
  res.send("The user updated successfully");

})


// ****************************************************************************************************************************************************************
// The DELETE request
app.delete(urls.deleteUrl.deleteUser, (req, res) => {
  deleteUser(usersList, req.params.id, DB_PATH);
  usersList = readFile(DB_PATH);
  res.send(usersList);

})
  app.listen(PORT, () => console.log(`Server runs on port ${PORT} ...`));
