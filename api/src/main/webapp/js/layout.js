"use strict";
// Define app, only one app for whole web site.
var mainApp = angular.module("mainApp", ["ngRoute"]);

mainApp.factory("shareName", function() {
	var name = "";
	function get() {
		return name;
	}
	function set(value) {
		name = value;
	}
	return {
		set: set,
		get: get
	}
});


