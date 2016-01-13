angular.module('dashCtrl',['pollsService'])
    .controller('dashController', function(Poll,Auth,$compile,$scope){
        var vm = this;
        
        vm.error = false;
        vm.success = false;
    
        //initialize poll data object
        vm.pollData = {}
        vm.pollData.option = [];
    
    
        //initialize counter variable - keeps track of each option element to be added to the option array
        vm.inputCounter = 1;
    
        vm.getMe = function(){
          Auth.getUser()
            .then(function(data){
                console.log(data);
                vm.userInfo = data;  
            })
            .catch(function(){
                vm.userError = true;
                vm.userErrorMessage = "Failed to retrieve user info.";
            });
        };
    
        //create poll
        vm.createPoll = function(){
            Poll.addPoll(vm.pollData.name, vm.pollData.option)
                //on success
                .then(function(data){
                    vm.success = true;
                    vm.successMessage = "Poll creation successful!";
                    //clear the form
                    vm.pollData = {};
                })
                //error
                .catch(function(){
                    vm.error = true;
                    vm.errorMessage = "Failed to submit poll. Please try again."
                });
        };
    
    
        //add to html function(option)
        vm.addOption = function(){
            var myEl = angular.element(document.querySelector('#pollFormId'));
            myEl.append('<label for="option">Option: </label><input type="text" class="form-control" ng-model="dash.pollData.option['+ vm.inputCounter +']" name="option">');
            // Compile the HTML and assign to scope- ng-model does not recognize appension
            var compile = $compile(myEl)($scope);
            
            vm.inputCounter++;
        };
    
    }); 