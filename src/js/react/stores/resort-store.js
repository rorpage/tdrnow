var alt = require('../alt');
var ResortActions = require('../actions/resort-actions');

class ResortStore {
    constructor() {
        this.hours = [];
        this.weather = {};
        this.disneylandWait = {};
        this.errorMessage = null;
        this.weatherErrorMessage = null;
        this.disneylandWaitErrorMessage = null;

        this.bindListeners({
            handleUpdateHours: ResortActions.UPDATE_HOURS,
            handleUpdateWeather: ResortActions.UPDATE_WEATHER,
            handleUpdateDisneylandWait: ResortActions.UPDATE_DISNEYLAND_WAIT,
            handleFetchHours: ResortActions.FETCH_HOURS,
            handleFetchWeather: ResortActions.FETCH_WEATHER,
            handleFetchDisneylandWait: ResortActions.FETCH_DISNEYLAND_WAIT,
            handleHoursFailed: ResortActions.HOURS_FAILED,
            handleWeatherFailed: ResortActions.WEATHER_FAILED,
            handleDisneylandWaitFailed: ResortActions.DISNEYLAND_WAIT_FAILED
        });
    }

    handleUpdateHours(hours) {
        this.hours.push(hours.Tds);
        this.hours.push(hours.Tdl);
        this.errorMessage = null;
    }

    handleUpdateWeather(weather) {
        this.weather = weather;
        this.weatherErrorMessage = null;
    }

    handleUpdateDisneylandWait(disneylandWait) {
        this.disneylandWait = disneylandWait;
    }

    handleFetchHours() {
        this.hours = [];
    }

    handleFetchWeather() {
        this.weather = {};
    }

    handleFetchDisneylandWait() {
        this.disneylandWait = {};
    }

    handleHoursFailed(errorMessage) {
        this.errorMessage = errorMessage;
    }

    handleWeatherFailed(errorMessage) {
        this.weatherErrorMessage = errorMessage;
    }

    handleDisneylandWaitFailed(errorMessage) {
        this.disneylandWaitErrorMessage = errorMessage;
    }
}

module.exports = alt.createStore(ResortStore, 'ResortStore');