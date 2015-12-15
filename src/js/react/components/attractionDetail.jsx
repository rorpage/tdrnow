import React from 'react';

var AttractionDetail = React.createClass({
    render() {
        return (
            <ul>
                <li>{this.props.attraction.name}</li>
                <li>{this.props.attraction.waitTime.postedWaitMinutes}</li>
            </ul>
        )
    }
});

module.exports = AttractionDetail;