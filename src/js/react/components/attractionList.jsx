var React       = require('react');
var _           = require('lodash');
var Attraction  = require('../components/attractionDetail.jsx');

var AttractionList = React.createClass({
    render: function() {

        var times = [];
        var self = this;

        /**
         * Group attractions in into their specifics lands by creating
         * an object with the name of the land and an array of all the
         * attractions in that land
         */
        $.each(this.props.lands, function(k, v) {
            var attractions = _.filter(self.props.times, {'Location': v.name});
            var area = {
                id: v.id,
                land: v.name,
                attractions: attractions
            }
            times.push(area);
        });

        return (
            <div>
                <h3>{this.props.park}</h3>
                
                {this.props.error}

                {times.map((info) => {
                    var attractions = [];
                    for (var i = 0; i < info.attractions.length; i++) {
                        attractions.push(<Attraction attraction={info.attractions[i]} />);
                    }

                    return (
                        <div key={info.id}>
                            <h4>{info.land}</h4>
                            {attractions}
                        </div>
                    )
                })}

            </div>
        );
    }
});

module.exports = AttractionList;