angular.module('estatApp')
.controller('GraficoPracaAnoController', ['$routeParams', 'recursoGraficoPracaAno', function($routeParams, recursoGraficoPracaAno){

    var self = this;
    //var context = $("#myCanvas");
    
    //self.dadosRelatorio = [];
    self.graficos = [];
    
    self.atualizaTela = function(regiao, ano){
    	self.pegarDados(regiao, ano);
    };

    self.pegarDados = function(paramRegiao, paramAno){
    	
    	if(!paramRegiao)
    		paramRegiao = $routeParams.regiao;
    	
    	if(!paramAno)
    		paramAno = $routeParams.ano;
    	
    	recursoGraficoPracaAno.query({regiao: paramRegiao, ano: paramAno}, function(data){

    		$('#divContainerCanvas').html('');
    		
            adicionaDadosAoGrafico(data);
            
            for(var i=0; i<self.graficos.length; i++){
            	self.graficos[i].update();
            }
            //atualizaGrafico(context);
          }, function(erro){
          	console.log('Falha do GET (recursoGraficoPracaAno.query)');
          	console.log(erro);
          });
    };
    
    var adicionaDadosAoGrafico = function(json){
    	var idEtapaAnterior = 0;
    	var chartData = {};
    	var indiceMes = 0;
    	var grafico = {};
    	self.graficos = [];
    	
    	for(var i = 0; i < json.length; i++){
    		
    		if(idEtapaAnterior == 0 || idEtapaAnterior != json[i].etapa.id){
    			
    			if(idEtapaAnterior != 0){
    				self.graficos.push(grafico);
    			}
    			
    			idEtapaAnterior = json[i].etapa.id;
    			grafico = criaGrafico();    			    			
    			grafico.options.title.text = json[i].sequencia + " - " + json[i].etapa.nomeEtapa + " [" + json[i].regiao.nome + "]";
    			indiceMes = 0;
    			//chartData = criaChartData();
    		}
    		
        	while(indiceMes+1 < json[i].mes){
        		grafico.data.datasets[0].data.push(null);
        		indiceMes++;
        	}
        	grafico.data.datasets[0].data.push(json[i].numeroHorasTotal);
        	indiceMes++;
    	}
    	
		if(idEtapaAnterior != 0){
			self.graficos.push(grafico);
		}
    	
    };

    
    var criaChartData = function(){
    	var cor = "rgba(20,220,20,0.8)";
		var chartData = {
			labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
	        datasets: [{
                lineTension: 0,
                fill: false,
                pointBorderWidth: 4,
                label: '',
                borderColor: cor,
                backgroundColor: cor,
                pointBorderColor: cor,
                pointBackgroundColor: cor,
                data: []                
            }]
		};
		return chartData;
    };
    
    var criaGrafico = function() {
    	var canvas = $('<canvas/>');
   	 	$('#divContainerCanvas').append(canvas);
    	//var canvas = $('#myCanvas');
    	var config = {
            type: 'line',
            data: criaChartData(),
            options: {
                responsive: true,
                legend: {
                    display: false
                },
                hover: {
                    mode: 'label'
                },                
                scales: {
                    yAxes: [{
                        display: true,                        
                        ticks: {
                        	beginAtZero: true,
                        	min: 0
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Horas'
                        }
                    }]
                },
                title: {
                    display: true,
                    text: ''
                }
            }            
        };
    	
    	var grafico = new Chart(canvas, config);
    	
    	//console.log(canvas);
    	//grafico.update();
    	//self.graficos.push(grafico);
    	return grafico;
    };

}]);
