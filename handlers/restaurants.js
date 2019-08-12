const db = require('../models');

/*
    ! Do not user forEach loops in async functions
*/

// Get all of the restaurants for this user
// GET/api/users/:id/restaurants
exports.getRestaurants = async function(req, res, next){
    try{
        let foundUser = await db.User.findById(req.params.id);
        let returnObject = [];
        for(const restaurantId of foundUser.restaurants){
            let restaurant = await db.Restaurant.findById(restaurantId)
            console.log("FOUND", restaurant)
            returnObject.push({
                name: restaurant.name,
                id: restaurantId
            });
        }
        return res.status(200).json(returnObject);
    }catch(err){
        console.log(err);
    }
}

// Get an individual restaurant

// Create a new restaurant
// POST/api/users/:id/restaurants name=<nameOfRestaurant>
exports.createRestaurant = async function(req, res, next){
    console.log(req.body)
    try{
        let restaurant = await db.Restaurant.create({
            name: req.body.name
        });
        restaurant.users.push(req.params.id);
        await restaurant.save()

        let foundUser = await db.User.findById(req.params.id);
        foundUser.restaurants.push(restaurant.id)
        await foundUser.save()

        return res.status(200).json(restaurant);
    }catch(err){
        return next(err);
    }
}

// Delete a restaurant
