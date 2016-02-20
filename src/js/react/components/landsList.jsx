import React from 'react';

var LandsList = React.createClass({
    render() {
        return (
            <section className="attractions"> 
                {this.props.lands.map((lands) => {
                    return (
                        <h4 className={ "attractions__header " + this.props.abrev } key={lands.id}>{lands.name}</h4>
                    )
                })}
            </section>
        );
    }
});

module.exports = LandsList;