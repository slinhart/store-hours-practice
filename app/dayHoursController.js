angular.module('app')
.controller('dayHoursController', ['$scope', function($scope) {
	var day = $scope.day;
	$scope.schedule[day].isClosed = false;

	$scope.addTimeClick = function() {
		$scope.schedule[day].times.push({
			start: {
				time: '',
				period: 'AM'
			},
			end: {
				time: '',
				period: 'PM'
			}
		});
	};

	$scope.closedClick = function() {
		$scope.schedule[day].isClosed = !$scope.schedule[day].isClosed;
	};
}]);