var Constants	= require('../constants/constants.js');
var Dispatcher	= require('../dispatchers/dispatcher.js');

var FrontPageActions = {
	setIsLoading: function(state) {
		Dispatcher.handleViewAction({
			actionType: Constants.SET_APP_STATE,
			data: state
		});
		return this;
	}
};

module.exports = FrontPageActions;