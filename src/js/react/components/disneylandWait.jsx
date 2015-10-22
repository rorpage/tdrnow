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
        this.setState({
            initialLoad: true
        });
        ResortStore.listen(this.onChange);
        ResortActions.fetchDisneylandWait({}, 1);
    },

    componentWillUnmount() {
        ResortStore.unlisten(this.onChange);
    },

    onChange(state) {
        this.setState(state);
        this.setState({
            initialLoad: false
        });
    },

    render() {

        var error = null;
        if (this.state.disneylandWaitErrorMessage) {
            error = <Error message={this.state.disneylandWaitErrorMessage} />
        }

        // if ($.isEmptyObject(this.state.disneylandWait)) {
        //     return (
        //         <h4>Loading...</h4>
        //     );
        // }

        if (this.state.initialLoad) {
            return (
                <LandsList park={"Tokyo Disneyland"} lands={Lands.disneylandLands} />
            )
        }

        return (
            <AttractionList park={"Tokyo Disneyland"} error={error} times={this.state.disneylandWait} />
        );

    }
});

module.exports = DisneylandWait;