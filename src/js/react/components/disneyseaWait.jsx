var React           = require('react');
var ResortStore     = require('../stores/resort-store');
var ResortActions   = require('../actions/resort-actions');
var AttractionList  = require('./attractionList.jsx');
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
        if (this.state.disneylandWaitErrorMessage) {
            error = <Error message={this.state.disneylandWaitErrorMessage} />
        }

        if ($.isEmptyObject(this.state.disneylandWait)) {
            return (
                <h4>Loading...</h4>
            );
        }

        return (
            <AttractionList park={"Tokyo DisneySea"} error={error} disneyland={this.state.disneylandWait} />
        );

    }
});

module.exports = DisneySeaWait;