//config/passport
//passport configuration

//load necessities
var LocalStrategy = require('passport-local').Strategy;

var User = require('../app/models/user');

module.exports = function(passport){
    
    //=============================================
    //passport session setup ======================
    //=============================================
    //required for persistent login sessions
    //passport needs ability to serialize and unserialize users out of the session
    
    //serialize user into the session
    passport.serializeUser(function(user,done){
       done(null,user.id); 
    });
    
    //deserialize the user from the session
    passport.deserializeUser(function(id,done){
        User.findById(id, function(err,user){
           done(err,user); 
        });
    });
    
    
    //=============================================
    //Local Signup
    //=============================================
    //we are using named strategies since we have on login and one for signup
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allow us to pass back the entire request to callback    
    },
                                                
        function(req,email,password,next){
            //asynchronous
            //User.findOne wont fire unless data is sent back
        
            process.nextTick(function(){
                
                //find a user whose email is the same as the forms email
                User.findOne({'local.email': email}, function(err,user){
                   //if there are any errors, return the error
                    if(err){return next(err);}
                    
                    //check to see if there is already a user with that email
                    if(user){
                        return next(null,false);
                    }
                    else{
                        //if there is no user with that email
                        //create the user
                        var newUser = new User();
                        
                        //set the user's local credentials
                        newUser.local.email = email;
                        newUser.local.password = newUser.generateHash(password);
                        newUser.local.name = req.body.name;

                        
                        //save the user in the database
                        newUser.save(function(err){
                            if(err){ throw err;}
                            return next(null,newUser);
                        });
                    }
                });
                
            });//end next tick function
        
                                                  
    })); //end local sign up strategy
    
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
                                                  
    function(req,email,password,next){
        
        User.findOne({'local.email': email}, function(err,user){
           
            if(err){ return next(err);}
            
            //if no user is found, return the message
            if(!user){
                return next(null,false);
            }
            
            if(!user.validPassword(password)){
                return next(null,false);
            }
            //all is well, return the successful user
            return next(null,user);
            
        });
    
    })); //end local login strategy
    
    
};//end exports