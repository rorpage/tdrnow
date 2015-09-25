var React = require('react');
var _     = require('lodash');

var AttractionList = React.createClass({
    render: function() {

        var grouped = _.groupBy(this.props.times, 'Location');
        var waitTimes = _.sortBy(this.props.times, 'Location');

        // console.log(grouped);
        // console.log(waitTimes);

        // TODO Group all the items based on their location. So we need to get the key
        // which is done already with the groupBy function. Now we need to iterate through.
        // This is not right, I just threw it together
        for (var i = 0; i < grouped.length; i++) {
            for (var j = 0; j < grouped[i].length; j++) {
                console.log(grouped[i][j]);
            }
        }

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