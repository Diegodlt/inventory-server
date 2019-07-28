exports.getIngredients = async function(req, res, next){
    try{
        let ingredient = "This will get all of the ingredients";
        return res.status(200).json(ingredient)
    }catch(err){

    }
}