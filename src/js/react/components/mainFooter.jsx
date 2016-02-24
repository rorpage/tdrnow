import React from 'react';

var MainFooter = React.createClass({
    render() {
        return (
            <footer className="footer">
                <p className="footer__text">Made with <i className="fa fa-heart" alt="love"></i> and <i className="fa fa-magic" alt="magic"></i> by <a href="http://www.tdrexplorer.com">TDR Explorer</a></p>
            </footer>
        )
    }
});

module.exports = MainFooter;