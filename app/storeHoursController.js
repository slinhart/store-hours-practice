angular.module('app')
.controller('storeHoursController', ['$scope', function($scope) {
	var week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	// Establish a default schedule
	var defaultHours = {
		start: {
			time: '8:00',
			period: 'AM'
		},
		end: {
			time: '5:00',
			period: 'PM'
		}
	};

	$scope.schedule = {};
	$scope.schedule.weekLabels = week;
	for (var i in week) {
		$scope.schedule[week[i]] = {
			times: [clone(defaultHours)],
			isClosed: false
		}
	}

	// Set Default state
	$scope.schedule.editable = false;

	// Click handlers
	var cache = {};
	$scope.schedule.editClick = function() {
		// Cache current values (incase of cancel)
		for (var i in week) {
			cache[week[i]] = clone($scope.schedule[week[i]]);
		}

		$scope.schedule.editable = true;
	};
	$scope.schedule.cancelClick = function() {
		// Restore from cache
		for (var i in week) {
			$scope.schedule[week[i]] = cache[week[i]];
		}
		cache = {};

		$scope.schedule.editable = false;
	};
	$scope.schedule.saveClick = function() {
		validateDates();
		cache = {};
		normalizeTimes();
		$scope.schedule.editable = false;
	};

	function normalizeTimes() {
		for (var i in week) {
			var times = $scope.schedule[week[i]].times;
			if($scope.schedule[week[i]].isClosed) {
				times = [];
			}

			var dateTimes = [];
			times.forEach(function(timespan) {
				if(timespan.start.time !== '' && timespan.end.time !== '') {
					dateTimes.push({
						start: createDate(timespan.start),
						end: createDate(timespan.end)
					});
				}
			});

			sortTimes(dateTimes);

			for(var j = 0; j < dateTimes.length-1; j++) {
				if(dateTimes[j].end >= dateTimes[j+1].start) {
					// Merge
					dateTimes[j].end = dateTimes[j+1].end;
					dateTimes.splice(j+1, 1);
				}
			}

			times = [];
			dateTimes.forEach(function(dateTimespan) {
				times.push({
					start: parseDate(dateTimespan.start),
					end: parseDate(dateTimespan.end)
				});
			});

			$scope.schedule[week[i]].times = times;
		}
	}

	// Sorts times by start date
	function sortTimes(dateTimes) {
		dateTimes.sort(function(a, b) {
			if(a.start < b.start) {
				return -1;
			}
			if(a.start > b.start) {
				return 1;
			}
			return 0;
		})
	}
	// Takes in time object (time and period) and returns date object,
	// with arbitrary but consistent date
	function createDate(timeObj) {
		var date = new Date('01/01/2016 ' + timeObj.time);
		if(timeObj.period === 'PM') {
			addPM(date);
		}
		return date;
	}

	// Takes in dateObj and returns object with time and period
	function parseDate(dateObj) {
		var hour = dateObj.getHours();
		var PM = false;
		if(hour > 12) {
			hour = hour - 12;
			PM = true;
		}

		var min = dateObj.getMinutes().toString();
		if(min.length === 1) {
			min = '0' + min;
		}

		return {
			time: hour.toString() + ':' + min,
			period: PM ? 'PM' : 'AM'
		};
	} 

	// Takes in reference to date object and adds 12 hours
	function addPM(dateObj) {
		dateObj.setTime(dateObj.getTime() + 12 * 60 * 60 * 1000);
	}

	function validateDates() {
		for (var i in week) {
			var times = $scope.schedule[week[i]].times;
			for(var j = 0; j < times.length; j++) {
				var startDate = createDate(times[j].start);
				var endDate = createDate(times[j].end);
				if(startDate.toString() === 'Invalid Date' || endDate.toString() === 'Invalid Date') {
					alert('Invalid Time Input. Use format HH:MM');
					$scope.schedule.cancelClick();
					break;
				}
			}
		}
	}

	// works on simple objects (without functions)
	function clone(obj) {
		return JSON.parse(JSON.stringify(obj));
	}
}]);