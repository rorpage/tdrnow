var React 					= require('react');
var FrontPageStore 			= require('../stores/front-page-store.js');
var FrontPageActions		= require('../actions/front-page-actions.js');

function getFrontPageState(){
	return {
		isLoading = FrontPageStore.isLoading()
	}
}

var FrontPage = React.createClass({
	
	getInitialState: function() {
		return getFrontPageState():
	},

	componentDidMount: function() {
		FrontPageStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		FrontPageStore.removeChangeListener(this._onChange);
	},

	render: function() {
		return (
			<h1 className="header">TDR Explorer</h1>
		)
	},

	_onChange: function() {
		this.setState(getFrontPageState());
	}
});

module.exports = FrontPage;