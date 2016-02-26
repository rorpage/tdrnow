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

        return (
            <div className="weather">
                <img className="icon weather__icon" src="/img/icon_weather@2x.png" />
                <Link className="weather__header" to="/weather">Weather</Link>
            </div>
        )
    }
});

module.exports = Weather;