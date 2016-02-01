var _   = require('lodash');

module.exports = {
    addUniqueCacheId(attractions) {
        let attractionsWithId = _.map(attractions, function(element){
            return _.assign({}, element, { 'cacheId': _.uniqueId('cache_id_') })
        });
        return attractionsWithId;
    },
}