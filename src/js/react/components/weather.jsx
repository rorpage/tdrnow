var React = require('react');
var ResortStore = require('../stores/resort-store');
var ResortActions = require('../actions/resort-actions');

var Weather = React.createClass({
    getInitialState() {
        return ResortStore.getState();
    },

    componentDidMount(){
        ResortStore.listen(this.onChange);
        ResortActions.fetchWeather();
    },

    componentWillUnmount(){
        ResortStore.unlisten(this.onChange);
    },

    onChange(state) {
        this.setState(state);
    },

    render() {

        if (this.state.weatherErrorMessage) {
            return (
                <h4>Error Occurred</h4>
            )
        }
        if (this.state.weather.length < 1) {
            return (
                <h4>Loading...</h4>
            )
        }

        return (
            <div>
                <h4>Weather</h4>
                {this.state.weather.Date}
            </div>
        )
    }
});

module.exports = Weather;