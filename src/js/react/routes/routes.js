var React           = require('react');
var Router          = require('react-router');
var DefaultRoute    = Router.DefaultRoute;
var Route           = Router.Route;
var RouteHandler    = Router.RouteHandler;

var LandingPage     = require('../components/landingPage.jsx');
var Weather         = require('../components/weather.jsx');
var Hours           = require('../components/hours.jsx');
var DisneylandWait  = require('../components/disneylandWait.jsx');
var DisneySeaWait   = require('../components/disneySeaWait.jsx');

var Routes = [
	<Route name="app" path="/" handler={App}>
        <Route name="hours" handler={Hours} />
        <Route name="weather" handler={Weather} />
        <Route name="tdl" handler={DisneylandWait} />
        <Route name="tds" handler={DisneySeaWait} />
        <DefaultRoute handler={LandingPage} />
    </Route>
];

module.exports = Routes;