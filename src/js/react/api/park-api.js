module.exports = {
	getParkHours: function(opts) {
		var options = {
			url: 'http://now.wdwnt.com/api/widget/gettokyoparkhours',
			type: 'get',
			dataType: 'jsonp'
		};

		if (opts) {
			$.extend(options, opts);
		}

		return $.ajax(options);
	},

	getWeather: function(opts) {
		var options = {
			url: 'http://now.wdwnt.com/api/weather/tdr',
			type: 'get',
			dataType: 'jsonp'
		};

		if (opts) {
			$.extend(options, opts);
		}

		return $.ajax(options);
	}
};