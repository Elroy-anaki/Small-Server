const {readFile} = require('../utils/CRUD');
const env = require("dotenv");
const DB_PATH = String(env.config().parsed.DB_PATH);

const updateDB = (req, res, next) => {
  usersList = readFile(DB_PATH);
  next();

}
module.exports = {DB_PATH, updateDB}