angular.module('tweetReaderApp')
.controller('TopFiveController', function(recursoTopFive){

    var self = this;
    self.usuarios = [];


    recursoTopFive.query(function(data){
      self.usuarios = data;
    }, function(erro){
    	console.log('Falha do GET (recursoTopFive.query)');
    	console.log(erro);
    });
    
});
