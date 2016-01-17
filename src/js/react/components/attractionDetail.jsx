import React from 'react';

var AttractionDetail = React.createClass({
    render() {
        return (
            <ul>
                <li>{this.props.attraction.name}</li>
                <li>Wait Time: {this.props.attraction.waitTime.postedWaitMinutes}</li>
                <li>FastPass: {this.props.attraction.waitTime.fastPass}</li>
                <li>FastPass Return: {this.props.attraction.waitTime.fastPass}</li>
                <li>Single Rider: {this.props.attraction.waitTime.singleRider}</li>
            </ul>
        )
    }
});

module.exports = AttractionDetail;