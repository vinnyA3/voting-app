angular.module('signupCtrl', ['authService'])
    .controller('signupController', function($location, Auth){
        var vm = this;
    
        //set error var
        vm.error = false;
    
        //signup function
        vm.signup = function(){
            vm.processing = true;
            Auth.signup(vm.signupData.name, vm.signupData.email, vm.signupData.password)
                // on success
                .then(function(data){
                    $location.path('/dashboard');
                    vm.processing = false;
                    vm.signupData = {};
                })
                //handle the error
                .catch(function(){
                    vm.processing = false;
                    vm.errorMessage = "Failed to signup. Please try again.";
                    vm.error = true;
                });
        };//end up signup
    
    }); //end controller