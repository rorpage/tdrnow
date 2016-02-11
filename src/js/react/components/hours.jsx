import React           from 'react';
import ResortStore     from '../stores/resort-store';
import ResortActions   from '../actions/resort-actions';
import Utilities       from '../../utils';
import { Link }        from 'react-router';

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
                <div className="box hours">
                    <h3><Link to="/hours">Todays Hours</Link></h3>
                    <h4>Loading...</h4>
                </div>
            );
        }

        return (
            <div className="hours">
                <img classame="icon hours__icon" src="/img/icon_clock@2x.png" />
                <h3 className="hours__header">Hours</h3>
            </div>
            // <div className="box hours">
            //     <h3><Link to="/hours">Todays Hours</Link></h3>

            //     {this.state.hours.map((hour) => {
            //         var parkName = Utilities.convertToParkName(hour.Abbreviation);

            //         return (
            //             <ul key={hour.Abbreviation.toLowerCase()}>
            //                 <li className="title"><h5>{parkName}</h5></li>
            //                 <li>Open {hour.HoursOfOperation}</li>
            //                 <li>Passport Type: {hour.passport_type}</li>
            //             </ul>
            //         )
            //     })}
                
            // </div>
        );
    }
});

module.exports = Hours;