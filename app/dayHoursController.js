angular.module('app')
.controller('dayHoursController', ['$scope', function($scope) {
	var day = $scope.day;

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
}]);