var React = require('react');
var _     = require('lodash');
var Lands = require('../components/data/lands.jsx');

var AttractionList = React.createClass({
    render: function() {
        var grouped = _.groupBy(this.props.times, 'Location');
        var waitTimes = _.sortBy(this.props.times, 'Location');

        var times = [];
        var self = this;
        $.each(Lands.disneySeaPorts, function(k, v) {
            var attractions = _.filter(self.props.times, {'Location': v.name});
            times.push(attractions);
        });

        console.log('Grouped Times');
        console.log(times);

        console.log('Returned Times');
        console.log(waitTimes);

        return (
            <div>
                <h4>{this.props.park}</h4>
                
                {this.props.error}

                {waitTimes.map((info) => {
                    var fastPass = "Available";
                        if (!info.fastPass) {
                            fastPass = "Finished";
                        }

                        var singleRider = "Available";
                        if (!info.singleRider) {
                            singleRider = "Not Available";
                        }
                        
                        return (
                            <ul key={info.id}>
                                <li>{info.name}</li>
                                <li>{info.waitTime.postedWaitMinutes}</li>
                                <li>{info.Location}</li>
                                <li>FastPass: {fastPass}</li>
                                <li>Single Rider: {singleRider}</li>
                            </ul>
                        )
                })}
            </div>
        );
    }
});

module.exports = AttractionList;