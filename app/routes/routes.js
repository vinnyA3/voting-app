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
        //get the user
        //User.find({'_id': req.user.local.id})
        User.findOne({'_id': req.user._id}, function(err,user){
           if(err){return res.send(err);}
            //return the user
            return res.send(user);
        });
    });
    
    //add a new poll
    app.post('/dashboard', isLoggedIn, function(req,res){
       // var poll = {name: req.body.name, options: req.body.option, creator: req.user.local.id};
        
        //create new poll object
        var newPoll = new Poll();
        //option object
        var option = req.body.option;
        
        newPoll.creator = req.user.local.email;
        newPoll.name = req.body.name;
        
        //for every option in option, push an object containing the option name
        option.forEach(function(op){
            newPoll.options.push({option: op, votes: 0});    
        });
        
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
    
    //put request to the specific poll page ... put request
    app.put('/polls/:poll_id', isLoggedIn, function(req,res){
        //First we find the poll id with req.params
        Poll.where({'_id': req.params.poll_id})
            //in that returned query object, find the object in the options array whose option the matches the request
            //then, increment that objects's vote value
            .update({'options.option' : req.body.option}, {$inc: {'options.$.votes': 1} } , function(err,poll){
                if(err){ return res.send(err);}
                
                //upon success, we'll make a query returning the updated poll
                Poll.findOne({'_id': req.params.poll_id}, function(err,poll){
                   if(err){ return res.send(err);}
                    //return the poll
                    return res.send(poll);
                });
                
            }); //end update
            
        });
        
    
    //route for deleteing a specific poll
    app.delete('/polls/:poll_id', isLoggedIn, function(req,res){
        Poll.remove({'_id' : req.params.poll_id}, function(err,user){
            if(err){ return res.send(err);}
            return res.json({success: true, message: 'Deleted Successfully!'}); 
        });
    });
    
    
    //route for returning all the polls
    app.get('/all-polls', isLoggedIn, function(req,res){
       Poll.find(function(err,polls){
          if(err){ return res.send(err);}
           //return all the polls
           res.send(polls);
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