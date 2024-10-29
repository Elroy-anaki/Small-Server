// Import the modules
const express = require('express');
const env = require('dotenv');

// Define the app and the port
const app = express();
const port = Number(env.config().parsed.PORT)



// The GET requests
app.get('/', (req, res) => res.send('Hello World!'))


app.listen(port, () => console.log(`Server runs on port ${port} ...`))