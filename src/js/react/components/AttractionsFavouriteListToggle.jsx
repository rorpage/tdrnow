import React           from  'react';
import ResortStore     from '../stores/resort-store';
import ResortActions   from '../actions/resort-actions';

var AttractionsFavouriteListToggle = React.createClass({
    
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

    activateFavourites(e) {
        $(e.target).toggleClass('favourite__button--active');
        ResortActions.showFavourites(!this.state.showFavourites);
    },

    render() {
        return (
            <div>
                <i className="fa fa-heart favourite__button favourite__button favourite__button--top" onClick={this.activateFavourites}></i>   
            </div>
        )
    }
});

module.exports = AttractionsFavouriteListToggle;