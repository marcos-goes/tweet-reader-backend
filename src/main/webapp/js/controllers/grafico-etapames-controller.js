angular.module('estatApp')
.controller('GraficoEtapaMesController', ['$routeParams', 'recursoGraficoEtapaMes', function($routeParams, recursoGraficoEtapaMes){

    var self = this;
    var context = $("#myCanvasEtapaMes");

    self.grafico = {};
    
    self.barChartData = {
    		labels: [],
    		datasets: []
    };
    
    self.atualizaTela = function(etapa, sequencia, mes, ano){
    	self.pegarDados(etapa, sequencia, mes, ano);
    };

    self.pegarDados = function(paramEtapa, paramSequencia, paramMes, paramAno){
    	
    	if(!paramEtapa)
    		paramEtapa = $routeParams.etapa;
    	
    	if(!paramSequencia)
    		paramSequencia = $routeParams.sequencia;
    	
    	if(!paramMes)
    		paramMes = $routeParams.mes;
    	
    	if(!paramAno)
    		paramAno = $routeParams.ano;
    	
    	recursoGraficoEtapaMes.query({etapa: paramEtapa, sequencia: paramSequencia, mes: paramMes, ano: paramAno}, function(data){
            adicionaDadosAoGrafico(data);
            atualizaGrafico(context);
          }, function(erro){
          	console.log('Falha do GET (recursoGraficoEtapaMes.query)');
          	console.log(erro);
          });
    };
    
    var adicionaDadosAoGrafico = function(json){
    	self.barChartData.datasets = [];
    	self.barChartData.labels = [];
    	for (var i = 0; i < json.length; i++) {
    	
    		var newDataset = {
    				label: json[i].regiao.nome,
    				backgroundColor: randomColor(),
    				data: []
            	};
            newDataset.data.push(json[i].numeroHorasTotal);
            self.barChartData.datasets.push(newDataset);
        }
    	
    	self.barChartData.labels.push('Etapa: ' + json[0].etapa.nomeEtapa);
    };
       
    var atualizaGrafico = function(ctx) {
    	self.grafico = new Chart(ctx, {
            type: 'bar',
            data: self.barChartData,
            options: {
            	legend: {
            		position: 'bottom'
            	},
                elements: {
                    rectangle: {
                        borderWidth: 1,
                        borderColor: 'rgb(0, 0, 0)',
                        borderSkipped: 'bottom'
                    }
                },
                responsive: true,
                title: {
                    display: true,
                    text: 'Gráfico por Etapa e Mês / Ano - Todas as Praças'
                }
            }
        });
    	self.grafico.update();
    };
    
    var randomColorFactor = function() {
        return Math.round(Math.random() * 255);
    };
    
    var randomColor = function() {
        return 'rgba(' + randomColorFactor() + ',' + randomColorFactor() + ',' + randomColorFactor() + ',.8)';
    };

}]);
