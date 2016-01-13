angular.module('allPollsCtrl', ['pollsService'])
    .controller('allPollsController', function(Poll){
        
        var vm = this;
        vm.error = false;
        
        vm.getAllPolls = function(){
            //get all polls
            Poll.getAllPolls()
                .then(function(data){
                     vm.allPolls = data;   
                })
                .catch(function(){
                    vm.error = true;
                    vm.errorMessage = "Could not retrieve polls at this time."
                });
        };
    
    });