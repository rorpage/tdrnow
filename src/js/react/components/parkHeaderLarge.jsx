import React    from 'react';
import { Link } from 'react-router';

var ParkHeaderLarge = React.createClass({
    render() {
        return (
            <div className={ "park-header park-header__" + this.props.abrev }>
                <h1>{this.props.park}</h1>
            </div>
        )
    }
});

module.exports = ParkHeaderLarge;