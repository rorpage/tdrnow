var React = require('react');

var ParkHeader = React.createClass({
    render() {
        return (
            <h3>
                <a href={"#/" + this.props.abrev}>{this.props.park}</a>
            </h3>
        )
    }
});

module.exports = ParkHeader;