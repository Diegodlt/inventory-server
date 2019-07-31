const mongoose = require('mongoose');
const User = require('./user');

const restaurantSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    user: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
})

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;