angular.module('tweetReaderApp')
.controller('NavegacaoController', ['$location', function($location){

    var self = this;
    
    self.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };

}]);
