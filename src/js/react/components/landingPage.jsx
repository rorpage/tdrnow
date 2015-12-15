import React           from 'react';
import Today           from '../components/today.jsx';
import Weather         from '../components/weather.jsx';
import Hours           from '../components/hours.jsx';
import DisneylandWait  from '../components/disneylandWait.jsx';
import DisneySeaWait   from '../components/disneySeaWait.jsx';
import ParkHeader      from '../components/parkHeader.jsx';

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