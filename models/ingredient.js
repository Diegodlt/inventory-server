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
    picture:{
        type: String //URL
        // Default: <some default url>
    },
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);
module.exports = Ingredient;