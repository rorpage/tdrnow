var React           = require('react');
var ResortStore     = require('../stores/resort-store');
var ResortActions   = require('../actions/resort-actions');
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
            console.log('there was an error');
            console.log(this.state.disneylandWaitErrorMessage);
        }

        return (
            <div>
                <h4>Tokyo Disneyland</h4>
                {error}
            </div>
        );
    }
});

module.exports = DisneylandWait;