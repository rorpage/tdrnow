import React           from 'react';
import ResortStore     from '../stores/resort-store';
import ResortActions   from '../actions/resort-actions';
import Utilities       from '../../utils';

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
            <div className="hours">
                <h3><a href="/#/hours">Todays Hours</a></h3>

                {this.state.hours.map((hour) => {
                    var parkName = Utilities.convertToParkName(hour.Abbreviation);

                    return (
                        <ul key={hour.Abbreviation}>
                            <li className="title"><h5>{parkName}</h5></li>
                            <li>Open {hour.HoursOfOperation}</li>
                            <li>Passport Type: {hour.passport_type}</li>
                        </ul>
                    )
                })}
                
            </div>
        );
    }
});

module.exports = Hours;