angular.module('pollsCtrl', ['pollsService'])
    .controller('pollsController', function($location,$routeParams, Poll){
        
        var vm = this;
    
        //set the error variable
        vm.error = false;
    
        vm.getpolls = function(){
            Poll.getPolls()
                //on success
                .then(function(data){
                    //set the poll object with the data
                    console.log(data);
                    vm.polls = data;
                })
                // on error
                .catch(function(data){
                    //set the error
                    vm.error = true;
                    vm.errorMessage = "Failed to retrieve polls. Please try again later.";
                    
                });
        }; //end get polls
    
        //delete poll
        vm.deletePoll = function(id){
            
          Poll.deletePoll(id)
            //on success
            .then(function(data){
            
              //after delete, get the new update polls list
              Poll.getPolls()
                //on success
                .then(function(data){
                    //set the poll object with the data
                    console.log(data);
                    vm.polls = data;
                })
                
            });    
          
        };
        
    
        vm.getPollInfo = function(){
            console.log('the id being passed is: ' + $routeParams.poll_id);
            Poll.getPoll($routeParams.poll_id)
                //on success
                .then(function(data){
                    vm.singlePoll = data;
                    console.log(data);    
                })
                //error
                .catch(function(){
                    console.log("error getting data...");
                });
        };
        
    
    });