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

    changeDegree() {
        let showCelcius = true;
        if (this.state.showCelcius) {
            showCelcius = !showCelcius;
        }

        this.setState({
            showCelcius: showCelcius
        });
    },

    render() {

        let temperature = <h2 className="landing-header_h2">{this.state.weather.Temp}&#8457;</h2>;

        if (this.state.showCelcius) {
            temperature = <h2 className="landing-header_h2">{this.state.weather.TempCelsius}&#8451;</h2>;
        }

        return (
            <div className="columns small-12 large-12 landing-header_weather" onClick={this.changeDegree}>
                <h2 className="landing-header_h2">current temperature</h2>
                {temperature}
            </div>
        )
    }
});

module.exports = Today;