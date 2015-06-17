var React       = require('react');
var ParkApi     = require('../api/park-api.js');
var ParkStore   = require('../stores/park-store.js');
var ParkActions = require('../actions/park-actions.js');

function getWeatherState(){
    return {
        isLoading: ParkStore.isLoading()
    };
}

var Weather = React.createClass({

    getInitialState: function() {
        return getWeatherState();
    },

    componentDidMount: function() {
        ParkStore.addChangeListener(this._onChange);
        
        var $weatherXhr = ParkApi.getWeather();
        $weatherXhr.done(function(response){
            console.log(response);
        })
        .always(function(response){
            ParkActions.setIsLoading(false);
        });
    },

    componentWillUnmount: function() {
        ParkStore.removeChangeListener(this._onChange);
    },

    render: function() {
        return (
            <h4>Weather</h4>
        )
    },

    _onChange: function() {
        this.setState(getWeatherState());
    }
});

module.exports = Weather;