import React           from 'react';
import Router          from 'react-router';
import LandingPage     from '../components/landingPage.jsx';
import Weather         from '../components/weather.jsx';
import Hours           from '../components/hours.jsx';
import DisneylandWait  from '../components/disneylandWait.jsx';
import DisneySeaWait   from '../components/disneySeaWait.jsx';

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
// Router.run(routes, Router.HistoryLocation, function(Handler) {
//     React.render(<Handler />, document.body);
// });

Router.run(routes, function(Handler) {
    React.render(<Handler />, document.getElementById('content'));
});