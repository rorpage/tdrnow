import React           from 'react';
import ResortStore     from '../stores/resort-store';
import ResortActions   from '../actions/resort-actions';
import Utilities       from '../../utils';
import _               from 'lodash';

var HoursAbbrev = React.createClass({
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
        if (this.state.errorMessage) {
            return (
                <h4>Error Occurred</h4>
            );
        }
        
        if ($.isEmptyObject(this.state.hours)) {
            return (
                <div className="columns large-6 main-content__hours">
                    <h4 className={ "main-content__hours-" + this.props.abbrev }>
                        <i class="fa fa-clock-o"></i>
                    </h4>
                </div>
            )
        }
        let hours = _.find(this.state.hours, { Abbreviation: this.props.abbrev.toUpperCase() });
        return (
            <div className="columns large-6 main-content__hours">
                <h4 className={ "main-content__hours-" + this.props.abbrev }>{hours.HoursOfOperation}</h4>
            </div>
        );
    }
});

module.exports = HoursAbbrev;