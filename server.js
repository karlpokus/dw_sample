var express = require('express'),
    app = express(),
    bodyparser = require('./lib/bodyparser'),
    savefile = require('./lib/savefile'),
    errorHandler = function(err, req, res, next) {
      console.error(err.message || err);
      res.status(500).end();
      // 404 to client, log err on server
    };

app.use(express.static('public'));

app.post('/data', [bodyparser, savefile, function(req, res){
  res.status(200).send('thanks');
}]);

app.use(errorHandler);

module.exports = app;
