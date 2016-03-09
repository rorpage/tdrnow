import React           from 'react';
import ResortStore     from '../stores/resort-store';
import ResortActions   from '../actions/resort-actions';
import Utilities       from '../../utils';
import { Link }        from 'react-router';

var HoursDetail = React.createClass({
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

        return (
            <div className="hours">
                <div className="hours__container">
                    <h2 className="hours__title"></h2>
                    <h3 className="hours__tdl">Tokyo Disneyland</h3>
                    <div className="hours__details-tdl">
                        <h3 className="hours__details-header">Open</h3>
                        <div className="hours__details-hours"></div>
                        <div className="hours__details-passport">Passport Type: </div>
                    </div>
                    <h3 className="hours__tds">Tokyo DisneySea</h3>
                    <div className="hours__details-tds">
                        <h3 className="hours__details-header">Open</h3>
                        <div className="hours__details-hours"></div>
                        <div className="hours__details-passport">Passport Type: </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = HoursDetail;