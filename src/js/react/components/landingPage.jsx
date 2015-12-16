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
                        <Today />
                    </div>
                </div>
                <div className="row">
                    <div className="columns large-6">
                        <Weather />
                    </div>
                    <div className="columns large-6">
                        <Hours />
                    </div>
                </div>
                <div className="row">
                    <div className="columns large-6">
                        <div className="box">
                            <ParkHeader abrev="tdl" park="Tokyo Disneyland" />
                        </div>
                    </div>
                    <div className="columns large-6">
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