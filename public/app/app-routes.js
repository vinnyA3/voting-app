(function(){
angular.module('appRoutes', ['ngRoute'])
    .config(function($routeProvider, $locationProvider){
        $routeProvider
            //when home route
            .when('/', {
                templateUrl: 'app/views/pages/home.html'
            })
            .when('/signup', {
                templateUrl: 'app/views/pages/signup.html',
                controller: 'mainController',
                controllerAs: 'signup'
            })
            .when('/login', {
                templateUrl: 'app/views/pages/login.html',
                controller: 'loginController',
                controllerAs: 'login'
            })
            .when('/dashboard', {
                templateUrl: 'app/views/pages/dashboard.html',
                controller:'mainController',
                controllerAs: 'main',
            });
    
        $locationProvider.html5Mode(true);
    });
    
})();

