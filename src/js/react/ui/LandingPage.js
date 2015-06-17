var React     = require('react');
var Weather   = require('../components/weather.react.js');
var Hours     = require('../components/hours.react.js');

React.render(
    <Hours />,
    document.getElementById('hours')
);

React.render(
    <Weather />,
    document.getElementById('weather')
);