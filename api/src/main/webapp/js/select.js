"use strict";

mainApp.controller("SelectController", function($scope, shareName, $http) {
	$scope.exit = function() {
		var finished = 1;
		for (var i = 0; i < $scope.results.length; i++) 
			if ($scope.results[i]["empty"] == 1) {
				alert("Sample #" + (i + 1) + " needs annotation!");
				$scope.jumpto(i);
				finished = -1
				break;
			}
		if (finished == 1) {
			$scope.save_result();
			alert("Thanks for your help!");
			window.location = "/";
		}
	};
	$scope.update_result = function() {
		if ($scope.best != -1 && $scope.worst != -1) {
			$scope.results[$scope.offset]["empty"] = 0;
			$scope.results[$scope.offset]["imgid"] = img_ids[$scope.start_idx + $scope.offset];
			$scope.results[$scope.offset]["best"] = $scope.caps[$scope.best]["capid"];
			$scope.results[$scope.offset]["worst"] = $scope.caps[$scope.worst]["capid"];
			$scope.results[$scope.offset]["candidates"] = [];
			for (var i = 0; i < $scope.caps.length; i++)
				$scope.results[$scope.offset]["candidates"].push($scope.caps[i]["capid"]);
			$scope.sample_color[$scope.offset] = "olive";
			$scope.loaded_caps[$scope.offset] = $scope.caps;
		}
		$scope.save_count += 1;
		if ($scope.save_count % 10 == 0) 
			$scope.save_result();
	};	
	$scope.get_caps = function() {
		if ($scope.results[$scope.offset]["empty"] == 0) 
			$scope.caps = $scope.loaded_caps[$scope.offset];
		else {
			var raw_caps = all_caps[img_ids[$scope.start_idx + $scope.offset]];
			for (var i = 0; i < 20; i++) {
				var r1 = Math.floor(Math.random() * raw_caps.length);
				var r2 = Math.floor(Math.random() * raw_caps.length);
				if (r1 != r2) {	
					var cache = raw_caps[r1];
					raw_caps[r1] = raw_caps[r2];
					raw_caps[r2] = cache;
				}
			}
			$scope.caps = [];
			for (var i = 0; i < $scope.ncandidates; i++)
				$scope.caps.push({caption: raw_caps[i]["caption"], capid: raw_caps[i]["id"], idx: i});
		}
	};
	$scope.activate_best = function(idx) {
		$scope.best = idx;
		$scope.best_color[$scope.best] = "red";
		$scope.cap_color[$scope.best] = "red";
	};
	$scope.deactivate_best = function() {
		if ($scope.best != -1) {
			$scope.best_color[$scope.best] = "white";
			$scope.cap_color[$scope.best] = "white";
			$scope.best = -1;
		}
	};
	$scope.activate_worst = function(idx) {
		$scope.worst = idx;
		$scope.worst_color[$scope.worst] = "green";
		$scope.cap_color[$scope.worst] = "green";
	};
	$scope.deactivate_worst = function() {
		if ($scope.worst != -1) {
			$scope.worst_color[$scope.worst] = "white";
			$scope.cap_color[$scope.worst] = "white";
			$scope.worst = -1;
		}
	};
	$scope.go = function() {
		$scope.get_caps();	
//		$scope.img_address = config["img_root"] + "/" + img_names[img_ids[$scope.start_idx + $scope.offset]];
		$scope.img_address = img_urls[img_ids[$scope.start_idx + $scope.offset]];
		$scope.deactivate_best();
		$scope.deactivate_worst();
		if ($scope.results[$scope.offset]["empty"] == 0) {
			var n = $scope.caps.length;
			for (var i = 0; i < n; i++) {
				if ($scope.caps[i]["capid"] == $scope.results[$scope.offset]["best"])
					$scope.activate_best(i);
				if ($scope.caps[i]["capid"] == $scope.results[$scope.offset]["worst"])
					$scope.activate_worst(i);
			}
		}
	};
	$scope.back = function() {
		$scope.update_result();
		if ($scope.offset > 0) {
			$scope.offset -= 1;
			$scope.go();
		}
	};
	$scope.jumpto = function(dst) {
		$scope.update_result();
		$scope.offset = dst;
		$scope.go();
	};
	$scope.next = function() {
		if ($scope.offset != -1) 
			$scope.update_result();
		if ($scope.offset < $scope.maximum_compare - 1) {
			$scope.offset += 1;
			$scope.go();	
		}
	};
	$scope.save_result = function() {
		$scope.name = shareName.get();
		$scope.save_address = config["result_root"] + "/" + $scope.timestamp + "_" + $scope.name + ".json";
		$http.get("/api/save", {
			params: {
				result: angular.toJson($scope.results),
				filename: $scope.save_address
			}
		});
	};
	$scope.update_worst = function(idx) {
		if ($scope.best == idx) 
			$scope.deactivate_best();
		if ($scope.worst != idx) {
			$scope.deactivate_worst();
			$scope.activate_worst(idx);
		}
	};
	$scope.update_best = function(idx) {
		if ($scope.worst == idx)
			$scope.deactivate_worst();
		if ($scope.best != idx) {
			$scope.deactivate_best();
			$scope.activate_best(idx);
		}
	};

	$scope.caps = [];
	$scope.worst = -1;
	$scope.best = -1;
	$scope.maximum_compare = 50;
	$scope.ncandidates = 3;
	$scope.sample_color = [];
	$scope.offsets = [];
	for (var i = 0; i < $scope.maximum_compare; i++) {
		$scope.sample_color.push("white");
		$scope.offsets.push(i + 1);
	}
	$scope.results = [];
	$scope.loaded_caps = [];
	for (var i = 0; i < $scope.maximum_compare; i++) {
		$scope.results.push({"empty": 1});
		$scope.loaded_caps.push([]);
	}
	$scope.cap_color = [];
	for (var i = 0; i < 10; i++)
		$scope.cap_color.push("white");
	$scope.worst_color = [];
	for (var i = 0; i < 10; i++)
		$scope.worst_color.push("white");
	$scope.best_color = [];
	for (var i = 0; i < 10; i++)
		$scope.best_color.push("white");
	$scope.save_count = 0;
	$scope.start_idx = Math.floor(Math.random() * (img_ids.length - $scope.maximum_compare));
	$scope.offset = -1;
	var currentdate = new Date();
	$scope.timestamp = currentdate.getTime();
	$scope.name = "";
	$scope.next(0);
});

$(".ui.checkbox").checkbox();                                                                                                                                                                                           
