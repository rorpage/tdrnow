import React           from 'react';
import ResortStore     from '../stores/resort-store';
import ResortActions   from '../actions/resort-actions';
import { Link }        from 'react-router';

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
                <div className="box weather">
                    <h3><Link to="/weather">Weather</Link></h3>
                    <h4>Loading...</h4>
                </div>
            )
        }

        return (
            <div className="weather">
                <h3 className="weather__header">Weather</h3>
            </div>

            // <div className="box weather">
            //     <h3><Link to="/weather">Weather</Link></h3>
            //     <ul>
            //         <li>{this.state.weather.Text} and {this.state.weather.TempCelsius}&#8451; ({this.state.weather.Temp}&#8457;)</li>
            //     </ul>
            //     <h5>Forecast</h5>
            //     <ul>
            //         <li>{this.state.weather.TodaysForecast.Text}</li>
            //         <li>
            //             High: {this.state.weather.TodaysForecast.HighCelsius}&#8451; ({this.state.weather.TodaysForecast.High}&#8457;)
            //         </li>
            //         <li>
            //             Low: {this.state.weather.TodaysForecast.LowCelsius}&#8451; ({this.state.weather.TodaysForecast.Low}&#8457;)
            //         </li>
            //     </ul>
            // </div>
        )
    }
});

module.exports = Weather;