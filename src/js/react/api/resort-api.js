module.exports = {
    fetchHours: function(opts) {
        var options = {
            url: 'http://now.wdwnt.com/api/widget/gettokyoparkhours',
            contentType: 'application/json',
            type: 'get',
            dataType: 'jsonp'
        };

        if (opts) {
            $.extend(options, opts);
        }

        return $.ajax(options);
    },
    
    fetchWeather: function(opts) {
        var options = {
            url: 'http://now.wdwnt.com/api/weather/tdr',
            contentType: 'application/json',
            type: 'get',
            dataType: 'jsonp'
        };

        if (opts) {
            $.extend(options, opts);
        }

        return $.ajax(options);
    },

    fetchWait: function(opts, id) {
        var options = {
            url: `http://now.wdwnt.com/api/tdr/attraction/getwaittimes/${id}`,
            contentType: 'application/json',
            type: 'get',
            dataType: 'jsonp'
        };

        if (opts) {
            $.extend(options, opts);
        }

        return $.ajax(options);
    }
}