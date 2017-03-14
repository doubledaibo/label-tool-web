"use strict";
mainApp.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when("/web/index", {
            templateUrl: "templates/index.html",
            controller: "IndexController"
        })
        .when("/web/label", {
            templateUrl: "templates/label.html",
            controller: "LabelController"
        })
        .when("/", {
            redirectTo: "/web/index"
        })
        .otherwise({
            templateUrl: "templates/404.html"
        });
    $locationProvider.html5Mode(true);
});
$(document).ready(function($) {});
