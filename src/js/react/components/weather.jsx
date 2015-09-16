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
        if ($.isEmptyObject(this.state.weather)) {
            return (
                <h4>Loading...</h4>
            )
        }

        return (
            <div>
                <h4>Weather</h4>
                <ul>
                    <li>{this.state.weather.Date}</li>
                    <li>{this.state.weather.Temp}</li>
                    <li>{this.state.weather.TempCelsius}</li>
                    <li>{this.state.weather.Text}</li>
                </ul>
                <h5>Forecast</h5>
                <ul>
                    <li>{this.state.weather.TodaysForecast.High}</li>
                    <li>{this.state.weather.TodaysForecast.HighCelsius}</li>
                    <li>{this.state.weather.TodaysForecast.Low}</li>
                    <li>{this.state.weather.TodaysForecast.LowCelsius}</li>
                    <li>{this.state.weather.TodaysForecast.Text}</li>
                </ul>
                <h5>Tomorrows Forecast</h5>
                <ul>
                    <li>{this.state.weather.TomorrowsForecast.High}</li>
                    <li>{this.state.weather.TomorrowsForecast.HighCelsius}</li>
                    <li>{this.state.weather.TomorrowsForecast.Low}</li>
                    <li>{this.state.weather.TomorrowsForecast.LowCelsius}</li>
                    <li>{this.state.weather.TomorrowsForecast.Text}</li>
                </ul>
            </div>
        )
    }
});

module.exports = Weather;