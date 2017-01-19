angular.module('tweetReaderApp')
.controller('TweetsHoraController', function(recursoTweetsPorHora){

    var self = this;
    self.tweets = [];


    recursoTweetsPorHora.query(function(data){
      self.tweets = data;
    }, function(erro){
    	console.log('Falha do GET (recursoTweetsPorHora.query)');
    	console.log(erro);
    });
    
});
