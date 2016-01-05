var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    path = require('path'),
    port = process.env.PORT || 8080;

//bpdy parser - allow use to handle posts
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//handle cors request
//app.use(function(req,res,next){ });

//morgan - allow us to view allrequests in the console
app.use(morgan('dev'));

//set location for static files
app.use(express.static(__dirname + '/public'));

//get route
app.get('/', function(req,res){
   res.sendFile(path.join(__dirname + '/public/app/views/index.html')); 
});

//listen on port
app.listen(port, function(){
   console.log('Listening on port: ' + port); 
});
