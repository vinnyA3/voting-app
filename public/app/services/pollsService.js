angular.module('pollsService', [])
    .factory('Poll', function($http,$q,$timeout){
        
        return({
          getPolls: getPolls,
          addPoll: addPoll,
          getPoll: getPoll,
          deletePoll: deletePoll
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
                    if(data){
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
    
        //get a poll
        function getPoll(id){
            //create instance of defer
            var deffered = $q.defer();
            
            //make reques
            $http.get('/polls/'+id)
                //on success
                .success(function(data){
                    //resolve
                    deffered.resolve(data);
                })
                //on error
                .error(function(data){
                    //reject
                    deffered.reject();
                });
            
            //return the promise
            return deffered.promise;
        };
        
        //delete a poll
        function deletePoll(id){
            //create instance of defer
            var deffered = $q.defer();
            
            $http.delete('/polls/' + id)
                //success  
                .success(function(data){
                    deffered.resolve();
                })
                //error
                .error(function(){
                    deffered.reject();
                });
            
            //return the promise object
            return deffered.promise;
                
        };
    
    
    }); //end service