var React       = require('react');
var ParkApi     = require('../api/park-api.js');
var ParkStore   = require('../stores/park-store.js');
var ParkActions = require('../actions/park-actions.js');

function getHoursState(){
    return {
        isLoading: ParkStore.isLoading()
    };
}

var Weather = React.createClass({

    getInitialState: function() {
        return getHoursState();
    },

    componentDidMount: function() {
        ParkStore.addChangeListener(this._onChange);
        
        var $hoursXhr = ParkApi.getParkHours();
        $hoursXhr.done(function(response){
            console.log(response);
        })
        .always(function(response){
            ParkActions.setIsLoading(false);
        });
    },

    componentWillUnmount: function() {
        ParkStore.removeChangeListener(this._onChange);
    },

    render: function() {
        return (
            <h4>Hours</h4>
        )
    },

    _onChange: function() {
        this.setState(getHoursState());
    }
});

module.exports = Weather;