const mongoose = require('mongoose'); // Import mongoose

const menuItemSchema = new mongoose.Schema({ // Define the MenuItem schema  and its fields
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    taste: {
        type: String,
        enum: ['sweet', 'spicy', 'sour'],
        required: true,
    },
    is_drink :{
        type :Boolean,
        default:false
    },
    ingredients: {
        type: [String],
        default: []
    },
    num_sales: {
        type: Number,
        default: 0
    }
})
 
const MenuItem =  mongoose.model('MenuItem', menuItemSchema); // Create the MenuItem model
module.exports = MenuItem; // Export the MenuItem model for use in other files
