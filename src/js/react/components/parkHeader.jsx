import React 	from 'react';
import { Link } from 'react-router';

var ParkHeader = React.createClass({
    render() {
        return (
            <h3>
                <Link to={"/" + this.props.abrev}>{this.props.park}</Link>
            </h3>
        )
    }
});

module.exports = ParkHeader;