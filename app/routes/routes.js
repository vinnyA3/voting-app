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
                //one success, redirect to the dashboard
                return res.status(200).json({success: true});
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
               return res.status(401).json({success:false, message:'Login Unsuccessful!'});
           }else{
               //explicitly call passport's login function
               req.login(user, function(err){
                   if(err){
                      return next(err);
                   } 
                      //on success, send Ok : 200 status
                      return res.status(200).json({success: true});
               });
           }
           
        })(req,res,next);
    }); 
    
    
    //route to test if the user is logged in or not
    app.get('/loggedin', function(req,res){
        res.send(req.isAuthenticated() ? req.user : '0');
    });
    //================================================
    //Protected api routes section
    //================================================
    
    app.get('/dashboard', isLoggedIn, function(req,res){
         res.send({success: true, message:'Hello, ' + req.user.local.name + '!'});
    });
    
    //add a new poll
    app.post('/dashboard', isLoggedIn, function(req,res){
       // var poll = {name: req.body.name, options: req.body.option, creator: req.user.local.id};
        
        //create new poll object
        var newPoll = new Poll();
        
        newPoll.creator = req.user.local.email;
        newPoll.name = req.body.name;
        newPoll.options = req.body.option;
        
        //save new poll
        newPoll.save(function(err){
            if(err){ return err;}
            //thats it
        });  
        
        res.status(200).send({message: 'Poll creation successful!'});
    });
    
    //route to dislpay all user's polls
    app.get('/polls', isLoggedIn, function(req,res){
       //go through database and find the polls the match the req.email
        Poll.find({'creator': req.user.local.email}, function(err,polls){
            if(err){ return res.send(err);}
            //return the found polls
             console.log(polls);
             res.send(polls);
        });
    });
    
    //dislpay a specifc poll
    app.get('/polls/:poll_id', isLoggedIn, function(req,res){
        if(req.params.poll_id){
            Poll.findOne({'_id': req.params.poll_id}, function(err,poll){
               if(err){ return res.send(err);}
                
                return res.json(poll);
            });
        }
    });
    
    //route for deleteing a specific poll
    app.delete('/polls/:poll_id', function(req,res){
        Poll.remove({'_id' : req.params.poll_id}, function(err,user){
            if(err){ return res.send(err);}
            return res.json({success: true, message: 'Deleted Successfully!'}); 
        });
    });
    
      
    //================================================
    // LOGOUT
    //================================================
    app.get('/logout', function(req,res){
       req.logout();//passports logout function
       res.status(200).json({status: 'Bye!'});
    });
    
};


//route middleware to make sure that a user is logged in 
function isLoggedIn(req,res,next){
    
    //if the user is authenticated in the session, carry on
    if(req.isAuthenticated()){
        return next();
    }
    //if they are not authenticated in the session, redirect them to the home page
     res.sendStatus(401);
}