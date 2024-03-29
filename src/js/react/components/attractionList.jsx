import React                from  'react';
import ResortStore          from '../stores/resort-store';
import ResortActions        from '../actions/resort-actions';
import Attraction           from '../components/attractionDetail.jsx';
import FavoutiesList        from './favouritesList.jsx';
import FavouritesListToggle from '../components/AttractionsFavouriteListToggle.jsx';
import { filter }           from 'lodash';

var AttractionList = React.createClass({

    getInitialState() {
        return ResortStore.getState();
    },

    componentDidMount() {
        ResortStore.listen(this.onChange);
    },

    componentWillUnmount() {
        /* 
         * Hide favourites so if the user goes to the other park
         * the favourites are hidden and we do not end up in weird
         * state of favourites showing when they shouldn't be
         */
        ResortActions.showFavourites(false);
        ResortStore.unlisten(this.onChange);
    },

    onChange(state) {
        this.setState(state);
    },

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

        let showFavourites = 'hide';
        let showWaitTimes = 'show';
        if (this.state.showFavourites) {
            showFavourites = 'show';
            showWaitTimes = 'hide';
        }

        return (
            <section className="attractions">
                <FavouritesListToggle />
                <FavoutiesList waittimes={this.props.times} favourites={this.props.favourites} show={showFavourites}/>
                
                {this.props.error}

                {times.map((info) => {
                    var attractions = [];
                    for (var i = 0; i < info.attractions.length; i++) {
                        
                        let lastItem = false;
                        if (i == (info.attractions.length - 1)) {
                            console.log('last item!');
                            lastItem = true;
                        }   
                        attractions.push(<Attraction key={info.attractions[i].id} attraction={info.attractions[i]} lastItem={lastItem} favourites={this.props.favourites}/>);
                    }

                    return (
                        <div key={info.land} className={showWaitTimes}>
                            <div className="row" data-equalizer>
                                <div className="columns large-12">
                                    <h4 className={ "attractions__header attractions__header--" + this.props.abrev }>{info.land}</h4>
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