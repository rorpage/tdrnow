var React           = require('react');
var Today           = require('../components/today.jsx');
var Weather         = require('../components/weather.jsx');
var Hours           = require('../components/hours.jsx');
var DisneylandWait  = require('../components/disneylandWait.jsx');
var DisneySeaWait   = require('../components/disneySeaWait.jsx');
var ParkHeader      = require('../components/parkHeader.jsx');

var LandingPage = React.createClass({
    render() {
        return (
            <div>
                <div className="row">
                    <div className="columns large-12">
                        <div className="box">
                            <Today />
                        </div>
                    </div>
                </div>
                <div className="row" data-equalizer>
                    <div className="columns large-6" data-equalizer-watch>
                        <div className="box">
                            <Weather />
                        </div>
                    </div>
                    <div className="columns large-6" data-equalizer-watch>
                        <div className="box">
                            <Hours />
                        </div>
                    </div>
                </div>
                <div className="row" data-equalizer>
                    <div className="columns large-6" data-equalizer-watch>
                        <div className="box">
                            <ParkHeader abrev="tdl" park="Tokyo Disneyland" />
                        </div>
                    </div>
                    <div className="columns large-6" data-equalizer-watch>
                        <div className="box">
                            <ParkHeader abrev="tds" park="Tokyo DisneySea" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = LandingPage;