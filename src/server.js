var express         = require('express');
var React           = require('react');
var Router          = require('react-router');
var routes          = require('./js/react/routes/routes.js');
var app = express();

app.get('/', function (req, res) {
  res.send('T-Mark');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

app.use(function(req, res, next) {
  var router = Router.create({location: req.url, routes: routes});
  router.run(function(Handler, state) {
    var html = React.renderToString(<Handler/>);
    return res.render('react_page', {html: html})
  });
});