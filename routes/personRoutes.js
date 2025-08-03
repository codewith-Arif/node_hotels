const express = require('express');
const router = express.Router();

const Person = require('./../models/Person'); // Import the Person model
const MenuItem = require('../models/MenuItem');

// POST router to add person
router.post('/', async(req, res) => {
  try{
    const data = req.body // Assuming the requet body contains the person data

    // Create a new Person document using the Mongoose model
    const newPerson = new Person(data);

    // Save the new person to the database
    const response = await newPerson.save();
    console.log('data saved');
    res.status(200).json(response);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
})

// GET methods to get person
router.get('/', async (req, res) => {
  try{
    const data =  await Person.find();
    console.log('data saved');
    res.status(200).json(data);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

// GET method to get person by work type
router.get('/:workType', async(req, res) =>{
  try{
    const workType = req.params.workType; //Extract the work type from the URL parameter
    if(workType =='chef' || workType == 'manager' || workType == 'waiter'){ 
      const response = await Person.find({work: workType}); //  
      console.log('response fetched');
      res.status(200).json(response);
    }else{
      res.status(404).json({error: 'Invalid work type'});
    }
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'})
  }
});

// PUT method to update person details
router.put('/:id', async (req, res) => {
  try {
    const personId = req.params.id; // Extract the ID from the URL parameter
    const updatedPersonData = req.body; // Updated data for the person
  const response = await Person.findByIdAndUpdate(
    personId,
    updatedPersonData,
    {
      new: true, // Return the updated document
      runValidators: true // Run Mongoose validation
    }
  );

    if (!response) {
      return res.status(404).json({ error: 'Person not found' });
    }
    console.log('data updated');
    res.status(200).json(response); // Send the updated person document as a response
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE method to remove a person by ID
router.delete('/:id', async (req, res) => {
  try {
    const personId = req.params.id; // Extract the person ID from the URL parameter
    
    // Assuming you have a person model
    const response = await Person.findByIdAndDelete(personId); 

    if (!response) {
      return res.status(404).json({ error: 'Person not found' });
    }
    console.log('data deleted');
    res.status(200).json({ message: 'Person deleted successfully' }); // Send success message
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;