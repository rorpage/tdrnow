import React from 'react';

var AttractionDetail = React.createClass({
    render() {
        return (
            <div className="columns small-12 medium-12 large-6" data-equalizer-watch>
                <div className="attraction">
                    <h4 className={ "attraction__header " + this.props.abrev }>{this.props.attraction.name}</h4>
                    <ul className="attraction__detail-list">
                        <li className="attraction__detail-list-item">Wait Time: {this.props.attraction.waitTime.postedWaitMinutes}</li>
                        <li className="attraction__detail-list-item">FastPass: {this.props.attraction.waitTime.fastPass}</li>
                        <li className="attraction__detail-list-item">Single Rider: {this.props.attraction.waitTime.singleRider}</li>
                        <li className="attraction__detail-list-item">FastPass Return: {this.props.attraction.waitTime.fastPass}</li>
                    </ul>
                </div>
            </div>
        )
    }
});

module.exports = AttractionDetail;