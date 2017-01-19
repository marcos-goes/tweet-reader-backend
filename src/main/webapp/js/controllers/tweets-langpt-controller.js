angular.module('tweetReaderApp')
.controller('TweetsLangPtController', function(recursoLangPt){

    var self = this;
    self.tweets = [];


    recursoLangPt.query(function(data){
      self.tweets = data;
    }, function(erro){
    	console.log('Falha do GET (recursoLangPt.query)');
    	console.log(erro);
    });
    
});
