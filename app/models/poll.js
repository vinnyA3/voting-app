//load mongoose
var mongoose = require('mongoose'),
    User = require('./user');

//votes Schema
var pollSchema = mongoose.Schema({
       name:String,
       options:[String],
       creator: {type: mongoose.Schema.Types.ObjectId, ref:'User'}
});

//send votesSchema to be used across the app
module.exports = mongoose.model('Poll', pollSchema);
