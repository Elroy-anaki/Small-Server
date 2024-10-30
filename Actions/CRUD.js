const fs = require("fs");


function getAllUsers(path) {
  return JSON.parse(fs.readFileSync(path, "utf8"));
}
// Create 
function addUser(user = Object, path) {
  usersList.push(user);
  fs.writeFileSync(path, JSON.stringify(usersList));
}
// Read
function getUserById(arr, id){
    const res = arr.findIndex((user) => user.id === id);
    return arr[res]
}

// Delete
function deleteUser(id, path) {
  if (usersList.length !== 0) {
    const itemIndex = usersList.findIndex((user) => user.id === id);
    usersList.splice(itemIndex, 1);
    usersList = fs.writeFileSync(PATH, JSON.stringify(usersList));
  }
}
// Update
function updateUser(updatedUser, path) {
  if (usersList.length !== 0) {
    const indexOfUser = usersList.findIndex((user) => user.id === updatedUser.id);
    if (!indexOfUser !== -1) usersList[indexOfUser] = updatedUser;
    fs.writeFileSync(path, JSON.stringify(usersList));

  }
}




exports.getAllUsers = getAllUsers;
exports.getUserById = getUserById;
exports.addUser = addUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.fs = fs;
exports.usersList = [];





