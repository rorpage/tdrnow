var React = require('react');
var ResortStore = require('../stores/resort-store');
var ResortActions = require('../actions/resort-actions');

var Hours = React.createClass({
    getInitialState() {
        return ResortStore.getState();
    },

    componentDidMount(){
        ResortStore.listen(this.onChange);
        ResortActions.fetchHours();
    },

    componentWillUnmount(){
        ResortStore.unlisten(this.onChange);
    },

    onChange(state) {
        this.setState(state);
    },

    render() {
        if (this.state.errorMessage) {
            return (
                <h4>Error Occurred</h4>
            );
        }
        if ($.isEmptyObject(this.state.hours)) {
            return (
                <h4>Loading...</h4>
            );
        }
        
        return (
            <div>
                <h4>Hours</h4>
                {this.state.hours.map((hour) => {
                    return (
                        <ul key={hour.Abbreviation}>
                            <li>{hour.Abbreviation}</li>
                            <li>{hour.HoursOfOperation}</li>
                            <li>{hour.passport_type}</li>
                        </ul>
                    )
                })}
                
            </div>
        );
    }
});

module.exports = Hours;