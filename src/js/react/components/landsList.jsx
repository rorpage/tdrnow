var React = require('react');

var LandsList = React.createClass({
	render: function() {
		return (
			<div>
				<h4>{this.props.park}</h4>

				<ul>
					{this.props.lands.map((lands) => {
						return (
							<li>{lands.name}</li>
						)
					})}
				</ul>
			</div>
		);
	}
});

module.exports = LandsList;