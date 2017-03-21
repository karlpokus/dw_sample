var mysql = require('mysql'),
    config = require('../config.json'),
    fs = require('fs'),
    path = require('path');

function dbConnection() {
  return mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
  });
}

function setPath(name) {
  return path.resolve(__dirname, '../', 'folders', name);
}

function setKeys() {
  // missing or empty
  if (!config.folders || Object.keys(config.folders) === 0) {
    config.folders = {
      temp: setPath('temp'),
      processing: setPath('processing'),
      history: setPath('history')
    };

    // 1+ keys set
  } else {
    config.folders = {
      temp: setPath(config.folders.temp || 'temp'),
      processing: setPath(config.folders.processing || 'processing'),
      history: setPath(config.folders.history || 'history')
    };
  }
}

function setPaths() {
  Object.keys(config.folders)
    .forEach(function(key){
      var filePath = config.folders[key];

      if (!fs.existsSync(filePath)){
        fs.mkdirSync(filePath);
      }
  });
}

function createConfigs(cb) {
  if (!config.db) {
    throw new Error('Missing required databaseCredentials in config.json');
  }

  setKeys();
  setPaths();
  cb(null, {
    config: config,
    connection: dbConnection()
  });
}

module.exports = createConfigs;
