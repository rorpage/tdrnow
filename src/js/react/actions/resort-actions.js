var alt = require('../alt');
var Api = require('../api/resort-api.js');

class ResortActions {
    updateHours(hours) {
        this.dispatch(hours);
    }

    updateWeather(weather) {
        this.dispatch(weather);
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

    hoursFailed(errorMessage) {
        this.dispatch(errorMessage);
    }

    weatherFailed(errorMessage) {
        this.dispatch(weatherErrorMessage);
    }
}

module.exports = alt.createActions(ResortActions);