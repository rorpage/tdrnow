import alt from '../alt';
import Api from '../api/resort-api';

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

    updateDisneySeaWait(disneysea) {
        this.dispatch(disneysea);
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
                this.actions.updateDisneylandWait(wait);
            })
            .error((errorMessage) => {
                this.actions.disneylandWaitFailed(errorMessage);
            });
    }

    fetchDisneySeaWait(opts, id) {
        this.dispatch();
        Api.fetchWait(opts, id)
            .done((wait) => {
                this.actions.updateDisneySeaWait(wait);
            })
            .error((errorMessage) => {
                this.actions.disneySeaWaitFailed(errorMessage);
            });
    }

    toJson(data) {
        console.log('callback!');
        console.log(data);
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

    disneySeaWaitFailed(errorMessage) {
        this.dispatch(errorMessage);
    }
}

module.exports = alt.createActions(ResortActions);