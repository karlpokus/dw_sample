var express = require('express'),
    app = express(),
    setConfig = require('./lib/config'),
    bodyparser = require('./lib/bodyparser'),
    saveFiles = require('./lib/saveFiles'),
    processFiles = require('./lib/processFiles'),
    errorHandler = function(err, req, res, next) {
      console.error(err.message || err);
      res.status(500).end();
      // 500 to client, log err on server
    },
    tempFinalHandler = function(req, res){
      res.status(200).send('done');
    };

setConfig(function(err, configs){
  app.set('globalConfig', configs.config);
  app.set('dbConnection', configs.connection);
});

app.use(express.static('public'));

app.post('/data', [bodyparser, saveFiles, processFiles, tempFinalHandler]);

app.use(errorHandler);

module.exports = app;
