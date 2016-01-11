angular.module('pollsCtrl', ['pollsService'])
    .controller('pollsController', function($location, Poll){
        
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
        
    
        //get single poll based on url parameters
        
        //post a poll from the dashboard .. move to top
    
    });