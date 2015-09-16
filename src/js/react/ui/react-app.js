var React           = require('react');
var Router          = require('react-router');
var LandingPage     = require('../components/landingPage.jsx');
var Weather         = require('../components/weather.jsx');
var Hours           = require('../components/hours.jsx');
var DisneylandWait  = require('../components/disneylandWait.jsx');
var DisneySeaWait   = require('../components/disneySeaWait.jsx');

// Router
var DefaultRoute    = Router.DefaultRoute;
var Link            = Router.Link;
var Route           = Router.Route;
var RouteHandler    = Router.RouteHandler;

var App = React.createClass({
    render: function() {
        return (
            <div>
                <header>
                    <div className="inner">
                        <h1><strong>TDR</strong> Today</h1>
                        <h3>Your park guide to Tokyo Disney Resort</h3>
                    </div>
                </header>
                <main>
                    <RouteHandler />
                </main>
                <footer>
                    <div className="inner">
                        <p>Made with <i className="fa fa-heart"></i> and <i className="fa fa-magic"></i> by <a href="http://www.tdrexplorer.com">TDR Explorer</a></p>
                    </div>
                </footer>
            </div>
        );
    }
});

var routes = (
    <Route name="app" path="/" handler={App}>
        <Route name="hours" handler={Hours} />
        <Route name="weather" handler={Weather} />
        <Route name="tdl" handler={DisneylandWait} />
        <Route name="tds" handler={DisneySeaWait} />
        <DefaultRoute handler={LandingPage} />
    </Route>
);

// Not working for some reason for clean URLS
// https://github.com/rackt/react-router/issues/199
Router.run(routes, Router.HistoryLocation, function(Handler) {
    React.render(<Handler />, document.body);
});

// Router.run(routes, function(Handler) {
//     React.render(<Handler />, document.body);
// });