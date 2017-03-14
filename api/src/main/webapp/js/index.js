"use strict";
mainApp.controller("IndexController", function($scope, shareName, $http, $location) {
	$scope.username = "";
	$scope.beginLabel = function() {
		if ($scope.username.length == 0)
			alert("Please input your name first!");
		else { 
			shareName.set($scope.username);
			$location.url("/web/label");
		}
	};	
});
