import React                from  'react';
import Attraction           from '../components/attractionDetail.jsx';
import ResortStore          from '../stores/resort-store';
import { indexOf }          from 'lodash';

var EmptyList = React.createClass({
    render() {
        return (
            <h4 className="attractions__text">
                You haven't added any favourites yet. Add them by clicking on the
                <i className="fa fa-heart favourite__button favourite__button--noposition favourite__button--small"></i>
            </h4>
        )
    }
});

var FavourtiesList = React.createClass({
    
    getInitialState() {
        return ResortStore.getState();
    },
    
    componentDidMount(){
        ResortStore.listen(this.onChange);
    },

    componentWillUnmount(){
        ResortStore.unlisten(this.onChange);
    },

    onChange(state) {
        this.setState(state);
    },

    render() {

        let favourites = [];
        this.props.waittimes.map((attraction) => {
            if (indexOf(this.props.favourites, parseInt(attraction.id)) != -1) {
                favourites.push(<Attraction key={attraction.id} attraction={attraction} lastItem={false} favourites={[]} hideFavouriteButton={"hide"}/>)
            }
        });

        if (favourites.length === 0) {
            favourites.push(<EmptyList key={"no-favourites"}/>);
        }
        
        return (
            <div className={this.props.show}>
                <div className="row" data-equalizer>
                    <div className="columns large-12">
                        <h4 className="attractions__header">Favourites</h4>
                    </div>
                </div>
                <div className="row large-uncollapse">
                    {favourites}
                </div>
            </div>
        )
    }
});

module.exports = FavourtiesList;