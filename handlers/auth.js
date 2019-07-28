const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signin = async function(req, res, next){
    try{
        let user = await db.User.findOne({
            email: req.body.email
        });
        let { id, username, email } = user;
        let isMatch = await user.comparePassword(req.body.password);
        if(isMatch){
            let token = jwt.sign(
                {
                    id,
                    username,
                    email
                },
                process.env.SECRET_KEY,
                {
                    expiresIn: "1h",
                }
            );
            return res.status(200).json({
                id,
                username,
                email,
                token
            });
        }else{
            return next({
                status: 400,
                message: "Invalid Email/Password"
            })
        }
    }catch(err){
        return next({status: 400, message: "Invalid Email/Password."})
    }
}