var React = require('react');
var _     = require('lodash');

var AttractionList = React.createClass({
    render: function() {
        console.log(this.props.times);
        var grouped = _.groupBy(this.props.times, 'Location');
        var waitTimes = _.sortBy(this.props.times, 'Location');

        // console.log(grouped);
        $.each(grouped, function(key, value) {
            // console.log(key);
        });
        // console.log(waitTimes);

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