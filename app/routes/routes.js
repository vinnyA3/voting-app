module.exports = function(app,passport){
    
    //process the signup form and run passport authentication
     app.post('/signup', function(req,res,next){
         passport.authenticate('local-signup', function(err,user,info){
            if(err){
                return next(err); //will generate internal 500 error
            } 
             //generate a json response reflecting authentication status
             if(!user){
                 return res.send({success : false, message: 'authentication has failed!'});
             }
             //explicitly run passport's login function
             req.login(user, function(err){
                if(err){return next(err);}
                return res.send({success:true,message:'authentication has succeeded!'});
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
               return res.send({success:false, message:'failed to login!'});
           }else{
               //explicitly call passport's login function
               req.login(user, function(err){
                   if(err){
                      return next(err);
                    }
                      return res.send({ success : true, message : 'authentication succeeded' }); 
               });
           }
           
        })(req,res,next);
    }); 
    
    //================================================
    //Protected api routes section
    //================================================
    
    app.get('/dashboard', isLoggedIn, function(req,res){
        console.log('we hit the route!');
        return res.send({success: true, message:'Hello, ' + req.user.local.name + '!'});
    });
    
    
    //================================================
    // LOGOUT
    //================================================
    app.get('/logout', function(req,res){
       req.logout();//passports logout function
       res.send({success:true, message:'Logged out successfully!'});
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