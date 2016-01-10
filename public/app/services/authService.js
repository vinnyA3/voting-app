angular.module('authService', [])
    .factory('Auth', function($http,$q,$timeout){
    
        //create user variable
        var user = null;
    
        return ({
            isLoggedIn: isLoggedIn,
            getUserStatus: getUserStatus,
            login: login,
            signup: signup,
            logout: logout
        });
    
        //is logged in function
        function isLoggedIn(){
          if(user){  
              console.log(user);
              return true;
          }else{
              return false;
          }
        };
    
        //user status function - returns true if we have a user, false otherwise
        function getUserStatus(){
            return user;
        };
    
    
        //signup function
        function signup(name,email,password){
            
            //create a new instance of deffered
            var deffered = $q.defer();
            
             $http.post('/signup', {
                name: name,
                email: email,
                password: password
            })
            //handle the success
            .success(function(data, status){
                 if(status == 200 && data.success){
                     user = true;
                     deffered.resolve();
                 }
                 else{
                     user = false;
                     deffered.reject();
                 }
             })
             // handle the error
             .error(function(data){
                 user = false;
                 deffered.reject();
             });
            
            //return the promise object
            
            return deffered.promise;
        
        };
        
        //login function
        function login(email,password){
            
            // create a new instance of deffered
            var deffered = $q.defer();
            
            //send post request to the server
            $http.post('/login', {
                email: email,
                password: password
            })
            //handle success
            .success(function(data,status){
                if(status == 200 && data.success){
                    user = true;
                    deffered.resolve();
                }else{
                    user = false;
                    deffered.reject();
                }
            })
            //handle the error
            .error(function(data){
               user = false;
               deffered.reject();
            });
            // ** DONT forget, return the promise object ***
            return deffered.promise;
            
        }//end login
    
        //logout function
        function logout(){
           //create the new instance of deffered
            var deffered = $q.defer();
            
            //set the get request to the server
            $http.get('/logout')
                //handle the success
                .success(function(){
                    user = false;
                    deffered.resolve();
                })
                // handle the error
                .error(function(data){
                    user = false;   
                    deffered.reject();
                });
            
            //return the promise object
            return deffered.promise;
        };
    
        
    }); //end auth service
