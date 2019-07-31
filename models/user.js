const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Restaurant = require('./restaurant');

/*
    Todo: Make unique email a requirement
*/

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    restaurants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Restaurant"
        }
    ]
});

userSchema.pre('save', async function(next){
    try{
        if(!this.isModified('password')){
            return next();
        }
        let hashPassword = await bcrypt.hash(this.password, 10);
        this.password = hashPassword;
        return next();
    }catch(err){
        return next(err);
    }
});

userSchema.methods.comparePassword = async function(candidatePassword, next){
    try{
        let isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }catch(err){
        return next(err);
    }
}
const User = mongoose.model("User", userSchema);

module.exports = User;