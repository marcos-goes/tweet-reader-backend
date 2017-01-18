angular.module('estatApp')
.controller('GraficoPracaMesController', ['$routeParams', 'recursoGraficoPracaMes', function($routeParams, recursoGraficoPracaMes){

    var self = this;
    var context = $("#myCanvasPracaMes");
    
    //self.dadosRelatorio = [];
    self.grafico = {};
    
    self.barChartData = {
    		labels: [],
    		datasets: []
    };
    
    self.atualizaTela = function(regiao, mes, ano){
    	self.pegarDados(regiao, mes, ano);
    };

    self.pegarDados = function(paramRegiao, paramMes, paramAno){
    	
    	if(!paramRegiao)
    		paramRegiao = $routeParams.regiao;
    	
    	if(!paramMes)
    		paramMes = $routeParams.mes;
    	
    	if(!paramAno)
    		paramAno = $routeParams.ano;
    	
    	recursoGraficoPracaMes.query({regiao: paramRegiao, mes: paramMes, ano: paramAno}, function(data){
            //self.dadosRelatorio = data;
            adicionaDadosAoGrafico(data);
            atualizaGrafico(context);
            self.grafico.options.title.text = 'Gráfico por Praça e Mês / Ano - ' + data[0].regiao.nome + ' ' + paramMes + '/' + paramAno;
            self.grafico.update();
          }, function(erro){
          	console.log('Falha do GET (recursoGraficoPracaMes.query)');
          	console.log(erro);
          });
    };
    
    var adicionaDadosAoGrafico = function(json){
    	var newDataset = {
                label: '',
                backgroundColor: "rgba(20,220,20,0.8)",
                data: []
            };
    	self.barChartData.labels = [];
        for (var i = 0; i < json.length; i++) {
            self.barChartData.labels.push(json[i].etapa.nomeEtapa);
            newDataset.data.push(json[i].numeroHorasTotal);
        }
        self.barChartData.datasets = [];
    	self.barChartData.datasets.push(newDataset);
    };

    
    var atualizaGrafico = function(ctx) {
    	self.grafico = new Chart(ctx, {
            type: 'bar',
            data: self.barChartData,
            options: {
            	legend: {
                    display: false
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
                    text: ''
                }
            }
        });    	
    };

}]);
