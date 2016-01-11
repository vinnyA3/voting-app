angular.module('pollsService', [])
    .factory('Poll', function($http,$q,$timeout){
        
        return({
          getPolls: getPolls,
          addPoll: addPoll
          //getPoll: getPoll
        });
    
        function getPolls(){
            
            //instance of deffered
            var deffered = $q.defer();
            
            //make http request
            $http.get('/polls')
                //on success
                .success(function(data){
                    if(data){
                        //resolve deffered
                        deffered.resolve(data);
                    }
                    else{
                        deffered.reject();
                    }
                })
                //handle error
                .error(function(data){
                    deffered.reject();
                });
            
            // return the promise object
            return deffered.promise;
        };
    
    
        //add poll
        function addPoll(name,option){
            
            //create new instance of defer
            var deffered = $q.defer();
            
            //post request
            $http.post('/dashboard', {
                name: name,
                option: option
            })
                //on success
                .success(function(status,data){
                    //return the promise && return data
                    if(status == 200 && data){
                        deffered.resolve(data);
                    }else{
                        //reject 
                        deffered.reject();
                    }
                    
                })
                //on error
                .error(function(data){
                    deffered.reject();
                });
            
            //return the promse
            return deffered.promise;
        };
    
    
    }); //end service