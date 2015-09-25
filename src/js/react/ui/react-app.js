var React           = require('react');
var Router          = require('react-router');
var LandingPage     = require('../components/landingPage.jsx');
var Weather         = require('../components/weather.jsx');
var Hours           = require('../components/hours.jsx');
var DisneylandWait  = require('../components/disneylandWait.jsx');
var DisneySeaWait   = require('../components/disneySeaWait.jsx');
var routes          = require('../routes/routes.js');

// Router
var DefaultRoute    = Router.DefaultRoute;
var Link            = Router.Link;
var Route           = Router.Route;
var RouteHandler    = Router.RouteHandler;

var App = React.createClass({
    render: function() {
        return (
            <div>
                <RouteHandler />
            </div>
        );
    }
});

// var routes = (
//     <Route name="app" path="/" handler={App}>
//         <Route name="hours" handler={Hours} />
//         <Route name="weather" handler={Weather} />
//         <Route name="tdl" handler={DisneylandWait} />
//         <Route name="tds" handler={DisneySeaWait} />
//         <DefaultRoute handler={LandingPage} />
//     </Route>
// );

// Not working for some reason for clean URLS
// https://github.com/rackt/react-router/issues/199
// Router.run(routes, Router.HistoryLocation, function(Handler) {
//     React.render(<Handler />, document.body);
// });

Router.run(routes, function(Handler) {
    React.render(<Handler />, document.getElementById('content'));
});