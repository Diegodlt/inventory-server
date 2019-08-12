const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    measurement:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        default: 0.0,
        required: true
    },
    quantity:{
        type: Number,
        default: 0,
        required: true
        /* 
            Todo: create validator, number can't be negative
        */
    },
    picture:{
        type: String //URL
        // Default: <some default url>
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant"
    }
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);
module.exports = Ingredient;