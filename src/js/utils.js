module.exports = {

    parkNames: {
        tdl: 'Tokyo Disneyland',
        tds: 'Tokyo DisneySea',
        resort: 'Tokyo Disney Resort'
    },

    convertToParkName: function(name){
        var abbrev = name.toLowerCase().trim();
        var parkName = this.parkNames.resort;

        if (this.parkNames.hasOwnProperty(abbrev)) {
            parkName = this.parkNames[abbrev];
        }
        return parkName;
    },

    isCacheValid: function (timeStamp) {
        let currentTime = moment();
        // let currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');
        console.log(currentTime.diff(timeStamp, 'minute'));
    }

};