const db = require('../models');

exports.getIngredients = async function(req, res, next){
    try{
        let userId = req.params.id;
        let restaurantId = req.params.restaurantId;

        let user = await db.User.findById(userId);
        if(!user.restaurants.includes(restaurantId)){
            return next({status: 401, message:"Unauthorized"})
        }
        let restaurant = db.Restaurant.findById(restaurantId);
        return res.status(200).json("Get ingredients worked")
    }catch(err){

    }
}