import React      from  'react';

var AttractionsFavourite = React.createClass({
    render() {
        return (
            <div className="attractions__favourite-button">
                <i className="fa fa-heart attractions__favourite-icon"></i>
            </div>
        )
    }
});

module.exports = AttractionsFavourite;