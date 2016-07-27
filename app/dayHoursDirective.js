angular.module('app')
.directive('dayHours', function() {
	return {
		restrict: 'E',
		scope: true,
		replace: true,
		templateUrl: 'app/assets/dayHoursTemplate.html',
		controller: 'dayHoursController'
	};
});