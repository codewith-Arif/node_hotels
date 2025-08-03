const express = require('express'); 
const router = express.Router(); 
const MenuItem = require('../models/MenuItem'); 

// Post Method to add a Menu item
router.post('/', async (req, res) => {
  try {
    const data = req.body; // Assuming the request body contains the menu item data to send to the server
    const newMenu = new MenuItem(data); // Create a new MenuItem document using the Mongoose model and the data from the request body
    const response = await newMenu.save(); // Save the new menu item to the database
    console.log('Menu item saved'); // Log success message
    res.status(200).json(response); // Send response with the saved menu item to the client
  } catch (err) { // Handle errors 
    console.log(err); // Log the error to the console
    res.status(500).json({ error: 'Internal Server Error' }); // Send error response to the client
  }
});

// GET method to get the Menu Items
router.get('/', async (req, res) => { 
  try {
    const data = await MenuItem.find();
    console.log('data fetched');
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// hw-> find menu items by taste 
router.get('/:tasteType', async (req, res) => {
  try{
  const tasteType = req.params.tasteType; // Extract the taste type from the URL parameter
   if(tasteType == 'spicy' || tasteType == 'sweet' || tasteType == 'sour'){
    const response = await MenuItem.find({taste: tasteType});
    console.log('response fetched')
    res.status(200).json(response);
   }
    else{
      res.status(404).json({error: 'Invalid taste type'});
    }
  }catch(error){
    console.log(error);
    res.status(500).json({error : 'Internal server error'});
  }
})

module.exports = router;
