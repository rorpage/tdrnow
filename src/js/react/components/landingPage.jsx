import React           from 'react';
import MainHeader      from '../components/mainHeader.jsx';
import MainFooter      from '../components/mainFooter.jsx';
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
                <header>
                    <div className="row">
                        <MainHeader />
                        <Today />
                    </div>
                </header>
                <div className="row">
                    <div className="columns large-6">
                        <ParkHeader abrev="tdl" park="Tokyo Disneyland" />
                    </div>
                    <div className="columns large-6">
                        <ParkHeader abrev="tds" park="Tokyo DisneySea" />
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
                <footer>
                    <div className="row">
                        <MainFooter />
                    </div>
                </footer>
            </div>
        )
    }
});

module.exports = LandingPage;