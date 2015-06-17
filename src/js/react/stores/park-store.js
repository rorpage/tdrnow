var Dispatcher      = require('../dispatchers/dispatcher.js');
var AppsConstants   = require('../constants/constants.js');
var EventEmitter    = require('events').EventEmitter;
var assign          = require('object-assign');

var CHANGE_EVENT = 'change';

var _isLoading = true;

function setIsLoading(state){
    _isLoading = state;
}

var ParkStore = assign(EventEmitter.prototype, {

    isLoading: function() {
        return _isLoading;
    },

    emitChange: function(){
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

Dispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case AppsConstants.SET_APP_STATE:
            setIsLoading(action.data);
            break;
        default:
            return true;
    }

    ParkStore.emitChange();
    return true;
});

module.exports = ParkStore;