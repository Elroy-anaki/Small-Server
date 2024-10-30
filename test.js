// Get All Users OR By a Query
app.get(urls.getUrl.defult, (req, res) => {
    usersList = getAllUsers(DB_PATH); // add a GLOBAL middleware
  
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
    const usersList = getAllUsers(DB_PATH);
    const id = Number(req.params.id);
    const user = getUserById(usersList, id);
    res.send(user);
  });