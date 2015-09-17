var React = require('react');

var AttractionList = React.createClass({
    render: function() {
        return (
            <div>
                <h4>{this.props.park}</h4>
                
                {this.props.error}

                {this.props.times.map((info) => {
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