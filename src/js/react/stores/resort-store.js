import alt           from '../alt';
import ResortActions from '../actions/resort-actions';

class ResortStore {
    constructor() {
        this.hours = [];
        this.favourites = [];
        this.showFavourites = false;
        this.weather = {};
        this.disneylandWait = {};
        this.disneySeaWait = {};
        this.errorMessage = null;
        this.weatherErrorMessage = null;
        this.disneylandWaitErrorMessage = null;
        this.disneySeaWaitErrorMessage = null;

        this.bindListeners({
            handleUpdateHours: ResortActions.UPDATE_HOURS,
            handleUpdateWeather: ResortActions.UPDATE_WEATHER,
            handleUpdateDisneylandWait: ResortActions.UPDATE_DISNEYLAND_WAIT,
            handleUpdateDisneySeaWait: ResortActions.UPDATE_DISNEY_SEA_WAIT,
            handleUpdateFavourites: ResortActions.UPDATE_FAVOURITES,
            handleShowFavourites: ResortActions.SHOW_FAVOURITES,

            // TODO These are not firing - maybe altjs changed how this is handled?
            // http://alt.js.org/guide/async/
            handleFetchHours: ResortActions.FETCH_HOURS,
            handleFetchWeather: ResortActions.FETCH_WEATHER,
            handleFetchDisneylandWait: ResortActions.FETCH_DISNEYLAND_WAIT,
            handleFetchDisneySeaWait: ResortActions.FETCH_DISNEY_SEA_WAIT,
            
            handleHoursFailed: ResortActions.HOURS_FAILED,
            handleWeatherFailed: ResortActions.WEATHER_FAILED,
            handleDisneylandWaitFailed: ResortActions.DISNEYLAND_WAIT_FAILED,
            handleDisneySeaWaitFailed: ResortActions.DISNEY_SEA_WAIT_FAILED
        });
    }

    handleUpdateHours(hours) {
        this.hours = [];
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

    handleUpdateDisneySeaWait(disneySeaWait) {
        this.disneySeaWait = disneySeaWait;
    }

    handleUpdateFavourites(favourites) {
        this.favourites = favourites;
    }

    handleShowFavourites(show) {
        this.showFavourites = show;
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

    handleFetchDisneySeaWait() {
        this.disneySeaWait = {};
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
    
    handleDisneySeaWaitFailed(errorMessage) {
        this.disneySeaWaitErrorMessage = errorMessage;
    }
}

module.exports = alt.createStore(ResortStore, 'ResortStore');