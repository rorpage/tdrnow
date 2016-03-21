import React      from  'react';

var AttractionsFavouriteListToggle = React.createClass({

    activateFavourites(e) {
        $(e.target).toggleClass('favourite-button--active');
    },

    render() {
        return (
            <div>
                <i className="fa fa-heart favourite-button favourite-button favourite-button--top" onClick={this.activateFavourites}></i>   
            </div>
        )
    }
});

module.exports = AttractionsFavouriteListToggle;