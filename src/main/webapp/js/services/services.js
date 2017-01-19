angular.module('tweetReaderServices', ['ngResource'])

	.factory('recursoTopFive', function($resource){
		return $resource('./rest/info/users-top-five',null, {
			query: {method: 'GET', isArray: true}
		})
	})

	.factory('recursoLangPt', function($resource){
		return $resource('./rest/info/tweets-lang-pt',null, {
			query: {method: 'GET', isArray: true}
		})
	})

	.factory('recursoTweetsPorHora', function($resource){
		return $resource('./rest/info/tweets-por-hora',null, {
			query: {method: 'GET', isArray: true}
		})
	})
	;
