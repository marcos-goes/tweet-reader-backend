angular.module('tweetReaderApp',['ngAnimate', 'ngRoute', 'tweetReaderServices'])
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

		//$locationProvider.html5Mode(true);
		//$locationProvider.hasPrefix('!');

		$routeProvider
		.when('/', {
			template: '<h5>Selecione entre as opções acima.</h5>'
		})
		.when('/top-five', {
			templateUrl: './partials/top-five.html',
			controller: 'TopFiveController',
			controllerAs: 'ctrl'
		})
		.when('/tweets-lang-pt', {
			templateUrl: './partials/tweets-lang-pt.html',
			controller: 'TweetsLangPtController',
			controllerAs: 'ctrl'
		})
		.when('/tweets-hora', {
			templateUrl: './partials/tweets-hora.html',
			controller: 'TweetsHoraController',
			controllerAs: 'ctrl'
		})
		.otherwise({
			redirectTo: '/'
		});

	}]);
