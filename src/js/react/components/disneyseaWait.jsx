import React           from 'react';
import ResortStore     from '../stores/resort-store';
import ResortActions   from '../actions/resort-actions';
import ParkHeader      from '../components/parkHeaderLarge.jsx';
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

        let abrev = "tds";
        let park = "Tokyo DisneySea";

        if ($.isEmptyObject(this.state.disneySeaWait)) {
            return (
                <section>
                    <ParkHeader abrev={abrev} park={park} />
                    <LandsList abrev={abrev} park={park} lands={Lands.disneySeaPorts} />
                </section>
            )
        }

        return (
            <section>
                <ParkHeader abrev={abrev} park={park} />
                <AttractionList park={"Tokyo DisneySea"}  abrev={"tds"} error={error} times={this.state.disneySeaWait} lands={Lands.disneySeaPorts} />
            </section>
        );

    }
});

module.exports = DisneySeaWait;