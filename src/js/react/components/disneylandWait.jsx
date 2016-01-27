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

        let cachedWait = localStorage.getItem('tdl');

        let cacheInvalid = localStorage.getItem('cacheTimeStamp') < moment().format('MMMM Do YYYY, h:mm:ss a');

        // Utils.isCacheValid(localStorage.getItem('cacheTimeStamp'));

        if (cacheInvalid) {
            console.log('cache is invalid');
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
        localStorage.setItem('cacheTimeStamp', moment().format('MMMM Do YYYY, h:mm:ss a'));
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