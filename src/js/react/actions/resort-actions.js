import alt      from '../alt';
import Api      from '../api/resort-api';

class ResortActions {
    updateHours(hours) {
        return hours;
    }

    updateWeather(weather) {
        return weather;
    }

    updateDisneylandWait(disneyland) {
        return disneyland;
    }

    updateDisneySeaWait(disneysea) {
        return disneysea;
    }

    updateFavourites(favourites) {
        return favourites;
    }

    fetchHours() {
        return Api.fetchHours()
            .done((hours) => {
                this.updateHours(hours);
            })
            .error((errorMessage) => {
                this.hoursFailed(errorMessage);
            });
    }

    fetchWeather() {
        return Api.fetchWeather()
            .done((weather) => {
                this.updateWeather(weather);
            })
            .error((errorMessage) => {
                this.weatherFailed(errorMessage);
            });
    }

    fetchDisneylandWait(opts, id) {
        return Api.fetchWait(opts, id)
            .done((wait) => {
                this.updateDisneylandWait(wait);
            })
            .error((errorMessage) => {
                this.disneylandWaitFailed(errorMessage);
            });
    }

    fetchDisneySeaWait(opts, id) {
        return Api.fetchWait(opts, id)
            .done((wait) => {
                this.updateDisneySeaWait(wait);
            })
            .error((errorMessage) => {
                this.disneySeaWaitFailed(errorMessage);
            });
    }

    fetchUserFavourites(key) {
        let favourites = JSON.parse(localStorage.getItem(key));
        if (favourites == null) {
            favourites = [];
        }
        return this.updateFavourites(favourites);
    }

    hoursFailed(errorMessage) {
        return errorMessage;
    }

    weatherFailed(errorMessage) {
        return errorMessage;
    }

    disneylandWaitFailed(errorMessage) {
        return errorMessage;
    }

    disneySeaWaitFailed(errorMessage) {
        return errorMessage;
    }
}

module.exports = alt.createActions(ResortActions);