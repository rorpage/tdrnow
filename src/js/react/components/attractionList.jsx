import React      from  'react';
import Attraction from '../components/attractionDetail.jsx';
import { filter } from 'lodash';

var AttractionList = React.createClass({
    render() {

        var times = [];
        var self = this;

        /**
         * Group attractions in into their specifics lands by creating
         * an object with the name of the land and an array of all the
         * attractions in that land
         */
        $.each(this.props.lands, function(k, v) {
            var attractions = filter(self.props.times, {'Location': v.name});
            var area = {
                id: v.id,
                land: v.name,
                attractions: attractions
            }
            times.push(area);
        });

        return (
            <section className="attractions">                
                {this.props.error}

                {times.map((info) => {
                    var attractions = [];
                    for (var i = 0; i < info.attractions.length; i++) {
                        attractions.push(<Attraction key={info.attractions[i].id} attraction={info.attractions[i]} />);
                    }

                    return (
                        <div key={info.land}>
                            <h4 className={ "attractions__header " + this.props.abrev }>{info.land}</h4>
                            {attractions}
                        </div>
                    )
                })}

            </section>
        );
    }
});

module.exports = AttractionList;