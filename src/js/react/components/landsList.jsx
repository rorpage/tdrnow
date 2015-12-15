import React from 'react';

var LandsList = React.createClass({
	render: function() {
		return (
			<div>
				<h4>{this.props.park}</h4>

				<ul key={this.props.park}>
					{this.props.lands.map((lands) => {
						return (
							<li key={lands.id}>{lands.name}</li>
						)
					})}
				</ul>
			</div>
		);
	}
});

module.exports = LandsList;