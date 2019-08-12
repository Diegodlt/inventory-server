const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
})

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;