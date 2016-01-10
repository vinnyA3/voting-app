angular.module('mainCtrl', ['authService'])
    .controller('mainController', function($location,$rootScope,Auth){
      var vm = this;

      vm.loggedIn = Auth.isLoggedIn();
    
      // check to see if a user is logged in on every request
      $rootScope.$on('$routeChangeStart', function() {
          vm.loggedIn = Auth.isLoggedIn();
      });
    
      vm.logout = function(){
          Auth.logout()
            .then(function(){
              //console.log(Auth.getUserStatus());
              $location.path('/login');
            });
      };
      
     
    
     /* vm.doSignUp = function(){
         Auth.signup(vm.signUpData.name, vm.signUpData.email, vm.signUpData.password)
            .success(function(data){
                //if successful login, display log out button
                if(data.success = true){
                    vm.message = data.message;
                    vm.loggedIn = true;
                    $location.path('/dashboard')
                }
                
            });
      };*/
      
    }); //end controller