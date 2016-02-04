import React           from 'react';
import ResortStore     from '../stores/resort-store';

var Today = React.createClass({

    getInitialState() {
        return ResortStore.getState();
    },

    componentDidMount(){
        ResortStore.listen(this.onChange);
    },

    componentWillUnmount(){
        ResortStore.unlisten(this.onChange);
    },

    onChange(state) {
        this.setState(state);
    },

    render() {
        return (
            <div className="columns small-12 large-12 landing-header_weather">
                <div>current temperature</div>
                <div>{this.state.weather.TempCelsius}&#8451;</div>
                <div>{this.state.weather.Temp}&#8457;</div>
            </div>
        )
    }
});

module.exports = Today;