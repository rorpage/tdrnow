var React           = require('react');
var ResortStore     = require('../stores/resort-store');
var ResortActions   = require('../actions/resort-actions');
var AttractionList  = require('./attractionList.jsx');
var Error           = require('./utils/error.jsx');
var Lands           = require('../components/data/lands.jsx');
var LandsList       = require('./landsList.jsx');
var alt             = require('../alt');

var DisneySeaWait = React.createClass({
    getInitialState() {
        return ResortStore.getState();
    },

    componentDidMount() {
        this.setState({
            initialLoad: true
        });
        ResortStore.listen(this.onChange);
        ResortActions.fetchDisneySeaWait({}, 2);
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
        if (this.state.disneySeaWaitErrorMessage) {
            error = <Error message={this.state.disneySeaWaitErrorMessage} />
        }

        console.log('boostrapped');
        console.log(Lands.disneySeaPorts);

        // if ($.isEmptyObject(this.state.disneySeaWait)) {
        //     return (
        //         <h4>Loading...</h4>
        //     );
        // }

        if (this.state.initialLoad) {
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