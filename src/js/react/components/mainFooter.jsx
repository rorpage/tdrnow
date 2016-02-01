import React from 'react';

var MainFooter = React.createClass({
    render() {
        return (
            <div className="columns small-12 large-12">
                <p>Made with <i className="fa fa-heart"></i> and <i className="fa fa-magic"></i> by <a href="http://www.tdrexplorer.com">TDR Explorer</a></p>
            </div>
        )
    }
});

module.exports = MainFooter;