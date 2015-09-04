var React           = require('react');
var Weather         = require('../components/weather.jsx');
var Hours           = require('../components/hours.jsx');
var DisneylandWait  = require('../components/disneylandWait.jsx');

var LandingPage = React.createClass({
    render() {
        return (
            <div>
                <Weather />
                <Hours />
                <DisneylandWait />
            </div>
        )
    }
});

module.exports = LandingPage;