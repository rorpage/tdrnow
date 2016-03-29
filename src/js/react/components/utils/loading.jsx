import React from 'react';

var Loading = React.createClass({
    
    render() {
        let img = `/img/loading-${this.props.abrev}.svg`;
        
        return (
            <section className="attractions">
                <div className="attractions__loading">
                    <h4 className="attractions__loading-text">Grabbing the latest wait times for you!</h4>
                    <img src={img}/>
                </div>
            </section>
        );
    }

});

module.exports = Loading;