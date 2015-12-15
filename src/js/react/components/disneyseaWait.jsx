import React           from 'react';
import ResortStore     from '../stores/resort-store';
import ResortActions   from '../actions/resort-actions';
import AttractionList  from './attractionList.jsx';
import Lands           from '../components/data/lands.js';
import LandsList       from './landsList.jsx';
import Error           from './utils/error.jsx';

var DisneySeaWait = React.createClass({
    getInitialState() {
        return ResortStore.getState();
    },

    componentDidMount() {
        ResortStore.listen(this.onChange);
        ResortActions.fetchDisneySeaWait({}, 2);
    },

    componentWillUnmount() {
        ResortStore.unlisten(this.onChange);
    },

    onChange(state) {
        this.setState(state);
    },

    render() {

        var error = null;
        if (this.state.disneySeaWaitErrorMessage) {
            error = <Error message={this.state.disneySeaWaitErrorMessage} />
        }

        if ($.isEmptyObject(this.state.disneySeaWait)) {
            return (
                <LandsList park={"Tokyo DisneySea"} lands={Lands.disneySeaPorts} />
            )
        }

        return (
            <AttractionList park={"Tokyo DisneySea"}  abrev={"tds"} error={error} times={this.state.disneySeaWait} lands={Lands.disneySeaPorts} />
        );

    }
});

module.exports = DisneySeaWait;