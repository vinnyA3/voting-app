//require user model 
var User = require('../models/user'),
    Poll = require('../models/poll');

module.exports = function(app,passport){
    
    //process the signup form and run passport authentication
     app.post('/signup', function(req,res,next){
         passport.authenticate('local-signup', function(err,user,info){
            if(err){
                return next(err); //will generate internal 500 error
            } 
             //generate a json response reflecting authentication status
             if(!user){
                 return res.send({success : false, message: 'Authentication Has Failed!'});
             }
             //explicitly run passport's login function
             req.login(user, function(err){
                if(err){return next(err);}
                return res.send({success:true,message:'Sign Up Successful!'});
             });
    
         })(req,res,next);
     }); 
    
    //handle login request and authenticate user
    app.post('/login', function(req,res,next){
        passport.authenticate('local-login', function(err,user,info){
           if(err){
               return next(err);
           }
           if(!user){
               return res.send({success:false, message:'Login Unsuccessful!'});
           }else{
               //explicitly call passport's login function
               req.login(user, function(err){
                   if(err){
                      return next(err);
                    }
                      return res.send({ success : true, message : 'Authentication Successful!' }); 
               });
           }
           
        })(req,res,next);
    }); 
    
    //================================================
    //Protected api routes section
    //================================================
    
    app.get('/dashboard', isLoggedIn, function(req,res){
        //query db for user 
        User.findById(req.user.local.id, function(err,user){
           if(err){ return err;}
            
           //just console the result for now....
            console.log(req.user);
            return res.send({success: true, message:'Hello, ' + req.user.local.name + '!'});
        });
        
    });
    
    app.post('/dashboard', isLoggedIn, function(req,res){
        var poll = {name: req.body.name, options: req.body.option, creator: req.user.local.id};
        //create new poll object
        var newPoll = new Poll();
        newPoll.polls = poll;
        
        //find the user with the request id and populate polls reference in User (UserSchema)
        User.findById(req.user.local.id)
             .populate('polls')
             .exec(function(err,user){
                 if(err){return err;}
                console.log(user);
                  console.log(req.user);
                 res.send({success:true, message: "Post Successful!"});
        });        
    });
    
    
    
    
    //================================================
    // LOGOUT
    //================================================
    app.get('/logout', function(req,res){
       req.logout();//passports logout function
       res.send({success:true, message:'Logged Out Successfully!'});
    });
    
};


//route middleware to make sure that a user is logged in 
function isLoggedIn(req,res,next){
    
    //if the user is authenticated in the session, carry on
    if(req.isAuthenticated()){
        return next();
    }
    //if they are not authenticated in the session, redirect them to the home page
     res.redirect('/');
}