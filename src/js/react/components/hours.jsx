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

        return (
            <div className="hours">
                <img className="icon hours__icon" src="/img/icon_clock@2x.png" />
                <Link className="hours__header" to="/hours">Hours</Link>
            </div>
        );
    }
});

module.exports = Hours;