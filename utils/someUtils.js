exports.isUserExist = (arr, id) => {
    const indexOfUser = arr.findIndex((user) => user.id === id);
    return indexOfUser !== -1;
  }
  
  