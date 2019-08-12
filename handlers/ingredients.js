const db = require('../models');

/*
    Todo: figure out how to authenticate collections not directly associated with the user
*/

exports.getIngredients = async function(req, res, next){
    try{
        let userId = req.params.id;
        let restaurantId = req.params.restaurantId;

        let user = await db.User.findById(userId);
        if(!user.restaurants.includes(restaurantId)){
            return next({status: 401, message:"Unauthorized"})
        }
        let restaurant = await db.Restaurant.findById(restaurantId);
        let restaurantName = restaurant.name;

        let ingredients = await db.Ingredient.find({restaurantId});

        return res.status(200).json({restaurantName, ingredients})
    }catch(err){

    }
}

exports.createIngredient = async function(req, res, next){
    try{
        console.log("CREATE INGREDIENT");
        console.log(req.body);
       let {name, measurement, quantity, price} = req.body;
       if(!quantity){
           quantity = 0;
       }
       if(!price){
           price = 0.0;
       }
       let ingredient = await db.Ingredient.create({
           name,
           measurement,
           quantity,
           price,
           restaurantId: req.params.restaurantId
       });
    //    let restaurant = await db.Restaurant.findById(req.params.restaurantId);
    //    console.log(restaurant);
    //    restaurant.ingredients.push(ingredient.id);
    //    await restaurant.save()
       
       return res.status(200).json(ingredient);
    }catch(err){
        console.log(err);
    }
}