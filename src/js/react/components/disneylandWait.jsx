import React           from 'react';
import ResortStore     from '../stores/resort-store';
import ResortActions   from '../actions/resort-actions';
import ParkHeader      from '../components/parkHeaderLarge.jsx';
import AttractionList  from './attractionList.jsx';
import Lands           from '../components/data/lands.js';
import LandsList       from './landsList.jsx';
import Error           from './utils/error.jsx';
import Loading         from './utils/loading.jsx';
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
        let noCachedTimeStamp = false;

        if (cachedTimestamp == null) {
            cachedTimestamp = moment();
            noCachedTimeStamp = true;
        }

        let currentTime = moment();
        let timeDifference = currentTime.diff(moment($.parseJSON(cachedTimestamp)), 'minutes');
        console.log('time difference: ' + timeDifference);

        if (timeDifference > 5 || noCachedTimeStamp) {
            cacheInvalid = true;
            console.log('cache is invalid');
        } else {
            console.log('cache is STILL valid');
        }

        if (cacheInvalid) {
            ResortActions.fetchDisneylandWait({}, 1);
        } else {
            this.setState({disneylandWait: $.parseJSON(cachedWait)});
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

        let abrev = "tdl";
        let park = "Tokyo Disneyland";

        if ($.isEmptyObject(this.state.disneylandWait)) {
            return (
                <section>
                    <ParkHeader abrev={abrev} park={park} />
                    <Loading abrev={abrev} />
                </section>
            )
        }
        return (
            <section>
                <ParkHeader abrev={abrev} park={park} />
                <AttractionList park={park} abrev={abrev} error={error} times={this.state.disneylandWait} lands={Lands.disneylandLands} />
            </section>
        );

    }
});

module.exports = DisneylandWait;