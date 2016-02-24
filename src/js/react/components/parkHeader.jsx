import React    from 'react';
import { Link } from 'react-router';

var ParkHeader = React.createClass({
    render() {
        return (
            <div className="columns large-6">
                <div className= { "main-content_button " + this.props.abrev} >
                	<Link to={"/" + this.props.abrev} className="main-content_link">{this.props.park}</Link>
            	</div>
            </div>
        )
    }
});

module.exports = ParkHeader;