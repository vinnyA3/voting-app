//load mongoose
var mongoose = require('mongoose'),
    User = require('./user');

//votes Schema
var pollSchema = mongoose.Schema({
       creator: String,
       name:String,
       options:[String]
});

//send votesSchema to be used across the app
module.exports = mongoose.model('Poll', pollSchema);
