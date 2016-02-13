import React from 'react';

var MainHeader = React.createClass({
    render() {
        return (
            <div className="columns small-12 large-12 landing-header_title">
                <h1 className="landing-header_h1"><strong>TDR</strong>Now</h1>
                <h3 className="landing-header_h3">Your in-park guide to Tokyo Disney Resort</h3>
            </div>
        )
    }
});

module.exports = MainHeader;