var express = require('express'),
    app = express(),
    morgan = require('morgan'),
    path = require('path'),
    passport = require('passport'),
    mongoose = require('mongoose'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    MongoStore = require('express-session-mongo'),
    configDB = require('./config/database'),
    port = process.env.PORT || 8080;

//CONFIGURATION ======================================================
mongoose.connect(process.env.MONGOLAB_URI || configDB.db);

require('./config/passport')(passport); //pass passport for configuration


//morgan - allow us to view allrequests in the console
app.use(morgan('dev'));
app.use(cookieParser('theregoesamanwhooncehaditall'));// read cookies - need for auth
//body parser - allow use to handle posts
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//configuration to handle CORS requests
app.use(function(req,res,next){
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, \ Authorization');
    
   next();
});


//set location for static files
app.use(express.static(__dirname + '/public'));

//required for passport
app.use(session({
    secret:'theregoesamanwhooncehaditall',
    store: new MongoStore(),
    resave: true,
    saveUninitialized: true
}));//secret key
app.use(passport.initialize());
app.use(passport.session());

//Routes
require('./app/routes/routes.js')(app,passport);

//catch all route
//send the users to the front end
//has to be registered for the api routes
app.get('*', function(req,res){
   res.sendFile(path.join(__dirname + '/public/app/views/index.html')); 
});

//listen on port
app.listen(port, function(){
   console.log('Listening on port: ' + port); 
});
