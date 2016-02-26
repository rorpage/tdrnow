import React           from 'react';
import MainHeader      from '../components/mainHeader.jsx';
import MainFooter      from '../components/mainFooter.jsx';
import Today           from '../components/today.jsx';
import Time            from '../components/time.jsx';
import Weather         from '../components/weather.jsx';
import Hours           from '../components/hours.jsx';
import DisneylandWait  from '../components/disneylandWait.jsx';
import DisneySeaWait   from '../components/disneySeaWait.jsx';
import ParkHeader      from '../components/parkHeader.jsx';
import HoursAbbrev     from '../components/hours-abbrev.jsx';

var LandingPage = React.createClass({
    render() {
        return (
            <div>
                <header className="landing-header">
                    <div className="row">
                        <MainHeader />
                        <Time />
                        <Today />
                    </div>
                </header>
                <main className="main-content">
                    <div className="row">
                        <ParkHeader abrev="tdl" park="Tokyo Disneyland" />
                        <ParkHeader abrev="tds" park="Tokyo DisneySea" />
                    </div>
                    <div className="row">
                        <HoursAbbrev abbrev="tdl" />
                        <HoursAbbrev abbrev="tds" />
                    </div>
                    <div className="row">
                        <div className="columns large-6">
                            <Weather />
                        </div>
                        <div className="columns large-6">
                            <Hours />
                        </div>
                    </div>
                </main>
                <MainFooter />
            </div>
        )
    }
});

module.exports = LandingPage;