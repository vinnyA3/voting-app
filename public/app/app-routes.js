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
                controller: 'signupController',
                controllerAs: 'signup'
            })
            .when('/login', {
                templateUrl: 'app/views/pages/login.html',
                controller: 'loginController',
                controllerAs: 'login'
            })
            .when('/dashboard', {
                templateUrl: 'app/views/pages/dashboard.html',
                controller:'dashController',
                controllerAs: 'dash',
            })
            .when('/polls', {
                templateUrl: 'app/views/pages/polls.html',
                controller: 'pollsController',
                controllerAs : 'poll'
            })
            .when('/poll/:poll_id', {
                templateUrl: 'app/views/pages/poll.html',
                controller: 'pollsController',
                controllerAs: 'poll'
            })
            .when('/all-polls',{
                templateUrl: 'app/views/pages/allPolls.html',
                controller: 'allPollsController',
                controllerAs: 'polls'
            })
            .otherwise({
                redirectTo: '/' 
            });
    
        $locationProvider.html5Mode(true);
    });
    
})();


