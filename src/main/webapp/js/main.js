angular.module('estatApp',['ngAnimate', 'ngRoute', 'estatServices'])
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

		//$locationProvider.html5Mode(true);
		//$locationProvider.hasPrefix('!');

		$routeProvider
		.when('/', {
			template: '<h3>Selecione entre as opções acima.</h3>'
		})
		.when('/grafico-praca-mes', {
			templateUrl: './partials/grafico-praca-mes.html',
			controller: 'GraficoPracaMesController',
			controllerAs: 'ctrl'
		})
		.when('/grafico-etapa-mes', {
			templateUrl: './partials/grafico-etapa-mes.html',
			controller: 'GraficoEtapaMesController',
			controllerAs: 'ctrl'
		})
		.when('/grafico-praca-ano', {
			templateUrl: './partials/grafico-praca-ano.html',
			controller: 'GraficoPracaAnoController',
			controllerAs: 'ctrl'
		})
		.otherwise({
			redirectTo: '/'
		});

	}]);
