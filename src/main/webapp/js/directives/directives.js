angular.module('estatApp')
	.directive('filtroPracaMesAno', ['recursoRegioes', 'recursoFiltroRegiao', function(recursoRegioes, recursoFiltroRegiao){
		var ddo = {};

		ddo.restrict = "E";
   
		ddo.scope = {
			idRegiaoSelecionada: '=?bind',
			regioes: '=?bind',
			filtroSelecionado: '=?bind',
			filtros: '=?bind',
			mostrarLink: '@',
			mostrarBotao: '@',
			titulo: '@',
			urlLink: '@',
			whenClick: '&'
		};
    
		ddo.transclude = true;
		
		ddo.link = function($scope, $element, $attrs){
		    recursoRegioes.query(function(data){
		      $scope.regioes = data;
		    }, function(erro){
		    	console.log('Falha do GET (recursoRegioes.query)');
		    	console.log(erro);
		    });
		    
		    $scope.populaSelectFiltro = function(){
		        recursoFiltroRegiao.query({regiaoId : $scope.idRegiaoSelecionada}, function(data){
		        	$scope.filtros = data;
		        	console.log("Dados: " + data);
		        }, function(erro){
		        	console.log('Falha do GET (recursoFiltroRegiao.query)');
		            console.log(erro);
		        });
		    };
		    
		    $scope.onClick = function(){
		    	$scope.whenClick({
		    		paramRegiao: $scope.idRegiaoSelecionada,
		    		paramMes: $scope.filtroSelecionado.mes,
		    		paramAno: $scope.filtroSelecionado.ano
		    	});
		    };

		};

		ddo.templateUrl = 'js/directives/filtro-praca-mes-ano.html';

		return ddo;
	}])
	
	.directive('filtroEtapaMesAno', ['recursoEtapa', 'recursoFiltroMesAno', function(recursoEtapa, recursoFiltroMesAno){
		var ddo = {};

		ddo.restrict = "E";
   
		ddo.scope = {
			etapaSelecionada: '=?bind',
			etapas: '=?bind',
			filtroSelecionado: '=?bind',
			filtros: '=?bind',
			mostrarLink: '@',
			mostrarBotao: '@',
			titulo: '@',
			urlLink: '@',
			whenClick: '&'
		};
    
		ddo.transclude = true;
		
		ddo.link = function($scope, $element, $attrs){
			recursoEtapa.query(function(data){
				$scope.etapas = data;
				console.log("Dados Etapas: " + data);
		    }, function(erro){
		    	console.log('Falha do GET (recursoEtapa.query)');
		    	console.log(erro);
		    });
		    
			recursoFiltroMesAno.query(function(data){
	        	$scope.filtros = data;
	        	console.log("Dados Filtros: " + data);
	        }, function(erro){
	        	console.log('Falha do GET (recursoFiltroMesAno.query)');
	            console.log(erro);
	        });
		    
		    $scope.onClick = function(){
		    	$scope.whenClick({
		    		paramEtapa:     $scope.etapaSelecionada.etapa.id,
		    		paramSequencia: $scope.etapaSelecionada.sequencia,
		    		paramMes: $scope.filtroSelecionado.mes,
		    		paramAno: $scope.filtroSelecionado.ano
		    	});
		    };

		};

		ddo.templateUrl = 'js/directives/filtro-etapa-mes-ano.html';

		return ddo;
	}])
	
	.directive('filtroPracaAno', ['recursoFiltroAno', 'recursoRegioes', function(recursoFiltroAno, recursoRegioes){
		var ddo = {};

		ddo.restrict = "E";
   
		ddo.scope = {
			idRegiaoSelecionada: '=?bind',
			regioes: '=?bind',
			anoSelecionado: '=?bind',
			anos: '=?bind',
			mostrarLink: '@',
			mostrarBotao: '@',
			titulo: '@',
			urlLink: '@',
			whenClick: '&'
		};
    
		ddo.transclude = true;
		
		ddo.link = function($scope, $element, $attrs){
		    recursoRegioes.query(function(data){
		      $scope.regioes = data;
		    }, function(erro){
		    	console.log('Falha do GET (recursoRegioes.query)');
		    	console.log(erro);
		    });
		    
		    recursoFiltroAno.query(function(data){
	        	$scope.anos = data;
	        	console.log("Dados: " + data);
	        }, function(erro){
	        	console.log('Falha do GET (recursoFiltroAno.query)');
	            console.log(erro);
	        });

		    
		    $scope.onClick = function(){
		    	$scope.whenClick({
		    		paramRegiao: $scope.idRegiaoSelecionada,
		    		paramAno: $scope.anoSelecionado.ano
		    	});
		    };

		};

		ddo.templateUrl = 'js/directives/filtro-praca-ano.html';

		return ddo;
	}])
;
