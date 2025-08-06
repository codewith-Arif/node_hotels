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

// hw-> find Menu Items by taste type
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

// PUT method to update menu item details
router.put('/:id', async (req, res) => {
  try {
    const menuId = req.params.id; // Extract the ID from the URL parameter
    const updatedMenuData = req.body; // Updated data for the menu item
    const response = await MenuItem.findByIdAndUpdate(
    menuId,
    updatedMenuData,
    {
      new: true, // Return the updated document
      runValidators: true // Run Mongoose validation
    }
  );
    // Check if the menu item was found and updated
    if (!response) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    console.log('Menu item updated');
    res.status(200).json(response); // Send the updated person document as a response
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE method to delete a menu item
router.delete('/:id', async (req, res) => {
  try {
    const menuId = req.params.id; // Extract the ID from the URL parameter
    const response = await MenuItem.findByIdAndDelete(menuId); // Delete the menu item by ID
    // Check if the menu item was found and deleted
    if (!response) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    console.log('Menu item deleted');
    // res.status(200).json({ message: 'Menu item deleted successfully' });  // Send success response 
    res.status(200).json(response); // Send the deleted menu item as a response
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' }); // Handle errors
  }
});

// comment added
// Export the router to use in the other files
module.exports = router;
