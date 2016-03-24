import React                from  'react';
import Attraction           from '../components/attractionDetail.jsx';
import { indexOf }          from 'lodash';

var FavourtiesList = React.createClass({
    render() {

        let favourites = [];
        this.props.waittimes.map((attraction) => {
            if (indexOf(this.props.favourites, parseInt(attraction.id)) != -1) {
                favourites.push(<Attraction key={attraction.id} attraction={attraction} lastItem={false} favourites={[]}/>)
            }
        });
        
        return (
            <section className="attractions">
                <div className="row" data-equalizer>
                    <div className="columns large-12">
                        <h4 className="attractions__header">Favourites</h4>
                    </div>
                </div>
                <div className="row large-uncollapse">
                    {favourites}
                </div>
            </section>
        )
    }
});

module.exports = FavourtiesList;