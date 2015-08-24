var alt = require('../alt');
var ResortActions = require('../actions/resort-actions');

class ResortStore {
	constructor() {
		this.hours = {};
		this.weather = {};
		this.errorMessage = null;
		this.weatherErrorMessage = null;

		this.bindListeners({
			handleUpdateHours: ResortActions.UPDATE_HOURS,
			handleFetchHours: ResortActions.FETCH_HOURS,
			handleFetchWeather: ResortActions.FETCH_WEATHER,
			handleHoursFailed: ResortActions.LOCATIONS_FAILED,
			handleWeatherFailed: ResortActions.WEATHER_FAILED
		});
	}

	handleUpdateHours(hours) {
		this.hours = hours;
		this.errorMessage = null;
	}

	handleUpdateWeather(weather) {
		this.weather = weather;
		this.weatherErrorMessage = null;
	}

	handleFetchHours() {
		this.hours = {};
	}

	handleFetchWeather() {
		this.weather = {};
	}

	handleHoursFailed(errorMessage) {
		this.errorMessage = errorMessage;
	}

	handleWeatherFailed(weatherErrorMessage) {
		this.weatherErrorMessage = weatherErrorMessage;
	}
}

module.exports = alt.createStore(ResortStore, 'ResortStore');