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
            handleUpdateWeather: ResortActions.UPDATE_WEATHER,
            handleFetchHours: ResortActions.FETCH_HOURS,
            handleFetchWeather: ResortActions.FETCH_WEATHER,
            handleHoursFailed: ResortActions.HOURS_FAILED,
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
        /** 
         * TODO: Do not care for this but it is from the tutorial. Rework later.
         * reset the array while we're fetching new locations so React can
         * be smart and render a spinner for us since the data is empty.
         */
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