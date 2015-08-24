var React     = require('react');
var Weather   = require('../components/weather.jsx');
var Hours     = require('../components/hours.jsx');

React.render(
    <Hours />,
    document.getElementById('hours')
);

React.render(
    <Weather />,
    document.getElementById('weather')
);