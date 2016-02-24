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
                        
                        let lastItem = false;
                        if (i == (info.attractions.length - 1)) {
                            console.log('last item!');
                            lastItem = true;
                        }   
                        
                        attractions.push(<Attraction key={info.attractions[i].id} attraction={info.attractions[i]} lastItem={lastItem}/>);
                    }

                    return (
                        <div key={info.land}>
                            <div className="row" data-equalizer>
                                <div className="columns large-12">
                                    <h4 className={ "attractions__header " + this.props.abrev }>{info.land}</h4>
                                </div>
                            </div>
                            <div className="row large-uncollapse">
                                {attractions}
                            </div>
                        </div>
                    )
                })}

            </section>
        );
    }
});

module.exports = AttractionList;