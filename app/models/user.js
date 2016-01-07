//Things that we need
var mongoose = require('mongoose'),
    bcrpyt = require('bcrypt-nodejs'),
    //require exports votes schema 
    Poll = require('./poll');

//define the schema for our user model
var userSchema = mongoose.Schema({
    local:{
        email: String,
        password: String,
        name: String
    },
    twitter:{
        id: String,
        token: String,
        name: String
    }
});

//methods
//generating a hash
userSchema.methods.generateHash = function(password){
    return bcrpyt.hashSync(password, bcrpyt.genSaltSync(8, null));
};

//check if the password is valid
userSchema.methods.validPassword = function(password){
    return bcrpyt.compareSync(password, this.local.password);  
};

//create the model for users and expose it our app
module.exports = mongoose.model('User', userSchema);