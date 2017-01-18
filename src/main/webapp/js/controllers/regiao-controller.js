angular.module('estatApp')
.controller('RegiaoController', function(recursoRegioes, recursoFiltroRegiao){

    var self = this;
    
    self.idRegiaoSelecionada = null;
    self.regioes = [];
    
    self.filtroSelecionado = null;
    self.filtros = [];

    recursoRegioes.query(function(data){
      self.regioes = data;
    }, function(erro){
    	console.log('Falha do GET (recursoRegioes.query)');
    	console.log(erro);
    });
    
    self.populaSelectFiltro = function(){
        recursoFiltroRegiao.query({regiaoId : self.idRegiaoSelecionada}, function(data){
        	self.filtros = data;
        	console.log("Dados: " + data);
        }, function(erro){
        	console.log('Falha do GET (recursoFiltroRegiao.query)');
            console.log(erro);
        });
    };

});
