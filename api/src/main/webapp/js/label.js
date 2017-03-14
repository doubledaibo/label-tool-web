"use strict";
mainApp.controller("LabelController", function($scope, shareName, $http) {
	$scope.exit = function() {
		$scope.save_result();
		alert("Thanks for your help!");
		window.location = "web/index";
	};
	$scope.vote = function(vote_result) {
		if (vote_result == 0) {
			$scope.results.push({"image_id": img_ids[$scope.idx], "result": "draw", "compare": $scope.cap1_method + "vs" + $scope.cap2_method});
		} else if ((vote_result == 1 && $scope.flip == 0) || (vote_result == 2 && $scope.flip == 1)) {
			$scope.results.push({"image_id": img_ids[$scope.idx], "result": $scope.cap1_method, "compare": $scope.cap1_method + "vs" + $scope.cap2_method});
		} else if ((vote_result == 2 && $scope.flip == 0) || (vote_result == 1 && $scope.flip == 1)) {
			$scope.results.push({"image_id": img_ids[$scope.idx], "result": $scope.cap2_method, "compare": $scope.cap1_method + "vs" + $scope.cap2_method});
		}
		$scope.result_count += 1;
		if ($scope.result_count % 10 == 0 || $scope.result_count == $scope.maximum_compare) {
			$scope.save_result();
			if ($scope.result_count == $scope.maximum_compare) {
				alert("Thanks for your help!");
				window.location = "web/index";
			}
		} else 
			$scope.next_pair();	
	};	
	$scope.get_cap = function() {
		if ($scope.compare_type == 0) { // GT vs GAN
			$scope.cap1 = gt_cap[img_ids[$scope.idx]];
			$scope.cap1_method = "GT";
			$scope.cap2 = gan_cap[img_ids[$scope.idx]];
			$scope.cap2_method = "GAN";
		} else if ($scope.compare_type == 1) { // MLE vs GAN
			$scope.cap1 = mle_cap[img_ids[$scope.idx]];
			$scope.cap1_method = "MLE";
			$scope.cap2 = gan_cap[img_ids[$scope.idx]]
			$scope.cap2_method = "GAN";
		} else { // MLE vs GT
			$scope.cap1 = gt_cap[img_ids[$scope.idx]]
			$scope.cap1_method = "GT";
			$scope.cap2 = mle_cap[img_ids[$scope.idx]]
			$scope.cap2_method = "MLE";
		}
		$scope.compare_type = ($scope.compare_type + 1) % 3;
	};
	$scope.next_pair = function() {
		$scope.idx = Math.floor((Math.random() * img_ids.length));
		$scope.img_address = config["img_root"] + "/" + img_names[$scope.idx];
		$scope.get_cap();
		$scope.flip = Math.floor(Math.random() * 2);
		if ($scope.flip == 0) {
			$scope.show_cap1 = $scope.cap1;
			$scope.show_cap2 = $scope.cap2;
		} else {
			$scope.show_cap1 = $scope.cap2;
			$scope.show_cap2 = $scope.cap1;
		}
	};
	$scope.save_result = function() {
		$scope.name = shareName.get();
		$scope.save_address = config["result_root"] + "/" + $scope.timestamp + "_" + $scope.name + ".json";		
		$http.get("/api/save", {
			params: {
				result: JSON.stringify($scope.results),
				filename: $scope.save_address
			}
		}).finally(function() {
			$scope.next_pair();
		});
	}

	$scope.cap1 = "";
	$scope.cap2 = "";
	$scope.maximum_compare = 100;
	$scope.compare_type = 0;
	$scope.results = [];
	$scope.result_count = 0;
	$scope.next_pair();
	var currentdate = new Date();
	$scope.timestamp = currentdate.getTime();
	$scope.name = "";
});
