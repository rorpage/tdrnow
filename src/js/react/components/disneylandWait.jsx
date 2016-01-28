import React           from 'react';
import ResortStore     from '../stores/resort-store';
import ResortActions   from '../actions/resort-actions';
import AttractionList  from './attractionList.jsx';
import Lands           from '../components/data/lands.js';
import LandsList       from './landsList.jsx';
import Error           from './utils/error.jsx';
import Utils           from '../../utils.js';

var DisneylandWait = React.createClass({
    getInitialState() {
        return ResortStore.getState();
    },

    componentDidMount() {
        ResortStore.listen(this.onChange);

        // Added cache invalidation. But this needs serious work. This is the first iteration just to get it working
        let cachedWait = localStorage.getItem('tdl');
        let cachedTimestamp = localStorage.getItem('cacheTimeStamp');
        let cacheInvalid = false;

        if (cachedTimestamp) {
            let currentTime = moment();
            console.log('time difference:');
            let timeDifference = currentTime.diff(moment($.parseJSON(cachedTimestamp)), 'minutes');

            if (timeDifference > 5) {
                cacheInvalid = true;
                console.log('cache is invalid');
            } else {
                console.log('cache is STILL valid');
            }
        }

        if (cachedWait && !cacheInvalid) {
            this.setState({disneylandWait: $.parseJSON(cachedWait)});
        } else {
            ResortActions.fetchDisneylandWait({}, 1);
        }
    },

    componentWillUnmount() {
        ResortStore.unlisten(this.onChange);
    },

    onChange(state) {
        localStorage.setItem('tdl', JSON.stringify(state.disneylandWait));
        localStorage.setItem('cacheTimeStamp', JSON.stringify(moment()));
        console.log(moment());
        this.setState(state);
    },

    render() {

        var error = null;
        if (this.state.disneylandWaitErrorMessage) {
            error = <Error message={this.state.disneylandWaitErrorMessage} />
        }

        if ($.isEmptyObject(this.state.disneylandWait)) {
            return (
                <LandsList park={"Tokyo Disneyland"} lands={Lands.disneylandLands} />
            )
        }
        return (
            <AttractionList park={"Tokyo Disneyland"} abrev={"tdl"} error={error} times={this.state.disneylandWait} lands={Lands.disneylandLands} />
        );

    }
});

module.exports = DisneylandWait;