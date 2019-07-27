const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/inventory-app',{
    keepAlive: true
});

module.exports.User = require('./user');