import React from 'react';

var Error = React.createClass({
    
    render: function() {
        return (
            <div className="error">
                {this.props.message}
            </div>
        );
    }

});

module.exports = Error;