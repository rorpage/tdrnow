var alt = require('../alt');
var Api = require('../api/resort-api.js');

class ResortActions {
    updateHours(hours) {
        this.dispatch(hours);
    }

    updateWeather(weather) {
        this.dispatch(weather);
    }

    updateDisneylandWait(disneyland) {
        this.dispatch(disneyland);
    }

    fetchHours() {
        this.dispatch();
        Api.fetchHours()
            .done((hours) => {
                this.actions.updateHours(hours);
            })
            .error((errorMessage) => {
                this.actions.hoursFailed(errorMessage);
            });
    }

    fetchWeather() {
        this.dispatch();
        Api.fetchWeather()
            .done((weather) => {
                this.actions.updateWeather(weather);
            })
            .error((errorMessage) => {
                this.actions.weatherFailed(errorMessage);
            });
    }

    fetchDisneylandWait(opts, id) {
        this.dispatch();
        Api.fetchWait(opts, id)
            .done((wait) => {
                console.log('fetch succeeded2');
                this.actions.updateDisneylandWait(wait);
                console.log('fetch succeeded');
            })
            .error((errorMessage) => {
                this.actions.disneylandWaitFailed(errorMessage);
                console.log('fetch failed');
                console.log(errorMessage);
            })
    }

    hoursFailed(errorMessage) {
        this.dispatch(errorMessage);
    }

    weatherFailed(errorMessage) {
        this.dispatch(errorMessage);
    }

    disneylandWaitFailed(errorMessage) {
        this.dispatch(errorMessage);
    }
}

module.exports = alt.createActions(ResortActions);