const express = require('express'); // Import express framework
const app = express(); // Create an instance of express
const db = require('./db'); // Import the database connection
require('dotenv').config();

const bodyParser = require('body-parser'); 
app.use(bodyParser.json()); // req.body
const PORT = process.env.PORT || 3000

app.get('/', function (req, res) { 
  res.send('Welcom to my hotel.. How I can help you?');
});

// Imports the router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');
  
// Use the routers
app.use('/person',personRoutes); 
app.use('/menu', menuItemRoutes);

app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});

module.exports = app; 