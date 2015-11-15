var React = require('react');

var AttractionDetail = React.createClass({
    render: function() {
        return (
            <ul key={this.props.attraction.id}>
                <li>{this.props.attraction.name}</li>
                <li>{this.props.attraction.waitTime.postedWaitMinutes}</li>
            </ul>
        )
    }
});

module.exports = AttractionDetail;