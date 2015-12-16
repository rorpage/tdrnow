import React           from 'react';
import ReactDOM        from 'react-dom';
import LandingPage     from '../components/landingPage.jsx';
import Weather         from '../components/weather.jsx';
import Hours           from '../components/hours.jsx';
import DisneylandWait  from '../components/disneylandWait.jsx';
import DisneySeaWait   from '../components/disneySeaWait.jsx';

import { Router, IndexRoute, Route, Link, RouteHandler } from 'react-router'

var App = React.createClass({
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
});

var routes = (
    <Router>
        <Route path="/" component={App}>
            <Route path="hours" component={Hours} />
            <Route path="weather" component={Weather} />
            <Route path="tdl" component={DisneylandWait} />
            <Route path="tds" component={DisneySeaWait} />
            <IndexRoute component={LandingPage} />
        </Route>
    </Router>
);

// Not working for some reason for clean URLS
// https://github.com/rackt/react-router/issues/199
// Router.run(routes, Router.HistoryLocation, function(Handler) {
//     React.render(<Handler />, document.body);
// });

ReactDOM.render((routes), document.getElementById('content'))