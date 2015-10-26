var React           = require('react');
var ResortStore     = require('../stores/resort-store');
var ResortActions   = require('../actions/resort-actions');
var AttractionList  = require('./attractionList.jsx');
var Lands           = require('../components/data/lands.jsx');
var LandsList       = require('./landsList.jsx');
var Error           = require('./utils/error.jsx');

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
            <AttractionList park={"Tokyo DisneySea"} error={error} times={this.state.disneySeaWait} />
        );

    }
});

module.exports = DisneySeaWait;