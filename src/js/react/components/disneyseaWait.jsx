var React           = require('react');
var ResortStore     = require('../stores/resort-store');
var ResortActions   = require('../actions/resort-actions');
var AttractionList  = require('./attractionList.jsx');
var Error           = require('./utils/error.jsx');
var Lands           = require('../components/data/lands.jsx');
var alt             = require('../alt');

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

        console.log('boostrapped');
        console.log(Lands.disneySeaPorts);

        if ($.isEmptyObject(this.state.disneySeaWait)) {
            return (
                <h4>Loading...</h4>
            );
        }
        return (
            <AttractionList park={"Tokyo DisneySea"} error={error} times={this.state.disneySeaWait} />
        );

    }
});

module.exports = DisneySeaWait;