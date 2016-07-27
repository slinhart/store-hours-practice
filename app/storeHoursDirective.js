angular.module('app')
.directive('storeHours', function() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'app/assets/storeHoursTemplate.html',
		controller: 'storeHoursController'
	};
});