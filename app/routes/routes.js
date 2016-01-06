module.exports = function(app,passport){
    
    //process the signup form
    //the credentials are processed through passport
    //if we have a sucessful authentication, callback gets fired up and returns json with credentials
    //else if authentication failed, then we respond with a 401 error ---
     app.post('/signup', function(req,res,next){
         passport.authenticate('local-signup', function(err,user,info){
            if(err){
                console.log("We have an internal error");
                return next(err); //will generate internal 500 error
            } 
             //generate a json response reflecting authentication status
             if(!user){
                 return res.send({success : false, message: 'authentication has failed!'});
             }
             return res.send({success:true, message:'authentication success!'});
         })(req,res,next);
     }); 
    
    app.post('/login', function(req,res,next){
        passport.authenticate('local-login', function(err,user,info){
           if(err){
               console.log("we have an internal error!");
               return next(err);
           }
           if(!user){
               return res.send({success:false, message:'failed to login!'});
           }else{
               console.log(req.user);
               return res.send({success:true, message:'Logged in successfully!'});
           }
           
        })(req,res,next);
    }); //handle when passport is configured
    
    //================================================
    //Protected api routes section
    //================================================
    
    app.get('/dashboard', isLoggedIn, function(req,res){
        res.send({success: true, message:'logged in successfully!, this is an authenticated route!', user: req.user});
    });
    
    
    //================================================
    // LOGOUT
    //================================================
    app.get('/logout', function(req,res){
       req.logout();
       res.send({success:true, message:'Logged out successfully!'});
    });
    
};


//route middleware to make sure that a user is logged in 
function isLoggedIn(req,res,next){
    
    //if the user is authenticated in the session, carry on
    if(req.isAuthenticated()){
        next();
    }
    
    //if they are not authenticated in the session, redirect them to the home page
    res.redirect('/');
}