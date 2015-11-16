var React           = require('react');
var ResortStore     = require('../stores/resort-store');
var ResortActions   = require('../actions/resort-actions');
var AttractionList  = require('./attractionList.jsx');
var Lands           = require('../components/data/lands.jsx');
var LandsList       = require('./landsList.jsx');
var Error           = require('./utils/error.jsx');

var DisneylandWait = React.createClass({
    getInitialState() {
        return ResortStore.getState();
    },

    componentDidMount() {
        ResortStore.listen(this.onChange);
        ResortActions.fetchDisneylandWait({}, 1);
    },

    componentWillUnmount() {
        ResortStore.unlisten(this.onChange);
    },

    onChange(state) {
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