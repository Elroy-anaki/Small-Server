const {readFile} = require('../utils/CRUD');
const env = require("dotenv");
const DB_PATH = String(env.config().parsed.DB_PATH);

const updateDB = (req, res, next) => {
  usersList = readFile(DB_PATH);
  next();

}

const setNewUser = (req, res, next) => {
  
  req.body.id = usersList[usersList.length - 1].id + 1;
  console.log(req.body);
  next();

}





module.exports = {DB_PATH, updateDB, setNewUser}