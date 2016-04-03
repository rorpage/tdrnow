import React           from 'react';
import ResortStore     from '../stores/resort-store';
import ResortActions   from '../actions/resort-actions';
import _               from 'lodash';

var AttractionDetail = React.createClass({

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
        localStorage.setItem('tdrnow-favourite-attractions', JSON.stringify(state.favourites));
        this.setState(state);
    },

    favouriteAttraction(e) {
        let $element = $(e.target);
        $element.toggleClass('favourite__button--active');

        let favouritesList = JSON.parse(localStorage.getItem('tdrnow-favourite-attractions'));
        if (favouritesList == null) {
            favouritesList = [];
        }

        let attractionId = $element.data('attractionid');

        if (_.indexOf(favouritesList, attractionId) != -1) {
            favouritesList = _.remove(favouritesList, function(n) {
                return n != attractionId;
            });
        } else {
            favouritesList.push(attractionId);
        }
        ResortActions.updateFavourites(favouritesList);
    },

    render() {

        let lastItemClass = "";
        if (this.props.lastItem) {
            lastItemClass = "attraction__last";
        }

        let userFavourite = "";
        if (_.indexOf(this.props.favourites, parseInt(this.props.attraction.id, 10)) != -1) {
            userFavourite = "favourite__button--active";
        }

        return (
            <div className="columns small-12 medium-12 large-6">
                <div className={ "attraction " + lastItemClass}>
                    <i className={"fa fa-heart favourite__button favourite__button--small " + userFavourite + " " + this.props.hideFavouriteButton} onClick={this.favouriteAttraction} data-attractionid={this.props.attraction.id}></i>
                    <h4 className="attraction__header">{this.props.attraction.name}</h4>
                    <ul className="attraction__detail-list">
                        <li className="attraction__detail-list-item">Wait Time: {this.props.attraction.waitTime.postedWaitMinutes}</li>
                        <li className="attraction__detail-list-item">FP: {this.props.attraction.waitTime.fastPass}</li>
                        <li className="attraction__detail-list-item">Single Rider: {this.props.attraction.waitTime.singleRider}</li>
                        <li className="attraction__detail-list-item">FP Return: {this.props.attraction.waitTime.fastPass}</li>
                    </ul>
                </div>
            </div>
        )
    }
});

module.exports = AttractionDetail;