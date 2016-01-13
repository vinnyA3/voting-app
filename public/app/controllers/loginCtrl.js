angular.module('loginCtrl', ['authService'])
    .controller('loginController', function(Auth, $location){
    
        //log out the user status
        console.log(Auth.getUserStatus());
    
        var vm = this;
        //initial values for error message and disabled button
        vm.error = false;
        //vm.disabled = false;
    
         vm.doLogin = function(){
          vm.processing = true;
          //call out login from the service
          Auth.login(vm.loginData.email, vm.loginData.password)
            //handle the success
            .then(function(data){
             //redirect to our dashboard
             $location.path('/dashboard');
              vm.processing = false;
              //vm.disabled = false;
              //empty our form
              vm.loginData = {};
          })
          //catch our error
          .catch(function(){
             vm.error = true;
             vm.errorMessage = "Invalid email and/or password!"
             vm.processing = false;
          });
             
      };//end do login 
    
    }); //end the controller