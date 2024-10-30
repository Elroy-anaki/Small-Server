exports.isUserExist = (arr, id) => {
  console.log(typeof(id))
    const indexOfUser = arr.findIndex((user) => user.id === id);
    return indexOfUser !== -1;
  }
  
  