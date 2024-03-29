import React           from 'react';

var Time = React.createClass({

    render() {
        /**
         * Timezones need to be added to the tz object. Found a cheatsheet cause it is overly complicated
         * https://github.com/moment/moment-timezone/blob/develop/data/packed/latest.json
         * http://momentjs.com/timezone/docs/#/data-loading/
         */
        moment.tz.add([
            "Asia/Tokyo|JCST JST JDT|-90 -90 -a0|0121212121|-1iw90 pKq0 QL0 1lB0 13X0 1zB0 NX0 1zB0 NX0",
            "America/Regina|LMT MST MDT MWT MPT CST|6W.A 70 60 60 60 60|012121212121212121212121341212121212121212121212121215|-2AD51.o uHe1.o 1in0 s2L0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 66N0 1cL0 1cN0 19X0 1fB0 1cL0 1fB0 1cL0 1cN0 1cL0 M30 8x20 ix0 1ip0 1cL0 1ip0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 3NB0 1cL0 1cN0"
        ]);
        
        var currentDate = moment().tz('Asia/Tokyo').format('MMMM Do YYYY');
        var currentTime = moment().tz('Asia/Tokyo').format('h:mm a');

        return (
            <div className="columns small-12 large-12 landing-header_time">
                <h1 className="landing-header_h1">{currentTime}</h1>
                <h2>{currentDate}</h2>
            </div>
        )
    }
});

module.exports = Time;