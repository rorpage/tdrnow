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
        }

        if ($.isEmptyObject(this.state.disneylandWait)) {
            return (
                <h4>Loading...</h4>
            );
        }

        return (
            <div>
                <h4>Tokyo Disneyland</h4>
                {error}
                {this.state.disneylandWait.map((info) => {
                    return (
                        <ul>
                            <li>{info.name}</li>
                        </ul>
                    )
                })}
            </div>
        );
    }
});

module.exports = DisneylandWait;