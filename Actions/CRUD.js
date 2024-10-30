const fs = require("fs");

function updateFile(arr, path){
  fs.writeFileSync(path, JSON.stringify(arr));

}
function readFile(path) {
  return JSON.parse(fs.readFileSync(path, "utf8"));
}
// Create
function addUser(arr, user = Object, path) {
  arr.push(user);
  updateFile(arr, path)
}
// Read
function getUserById(arr, id) {
  const res = arr.findIndex((user) => user.id === id);
  return arr[res];
}

// Delete
function deleteUser(arr, id, path) {
    const userIndex = arr.findIndex((user) => user.id === id);
    arr.splice(userIndex, 1);
    console.log(arr)
    updateFile(arr, path)
  }

// Update
function updateUser(arr, updatedUser, id, path) {
  const indexOfUser = arr.findIndex((user) => user[id] === updatedUser[id]);
  if (indexOfUser > -1) arr[indexOfUser] = updatedUser;
  updateFile(arr, path)
}
exports.updateFile = updateFile;
exports.readFile = readFile;
exports.getUserById = getUserById;
exports.addUser = addUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.fs = fs;
exports.usersList = [];
