var mysql = require('mysql'),
    config = require('../config.json'),
    fs = require('fs'),
    path = require('path');

if (!config.db) {
  throw new Error('Missing required databaseCredentials in config.json');
}

function dbConnection() {
  return mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
  });
}

function setKeys() {
  // missing or empty
  if (!config.folders || Object.keys(config.folders) === 0) {
    config.folders = {
      temp: 'temp',
      processing: 'processing',
      history: 'history'
    };

    // 1+ keys set
  } else {
    config.folders = {
      temp: config.folders.temp || 'temp',
      processing: config.folders.processing || 'processing',
      history: config.folders.history || 'history'
    };
  }
}

function createConfigs(cb) {
  setKeys();

  Object.keys(config.folders)
    .forEach(function(folderNameKey){
      var filePath = path.resolve(__dirname, '../', 'folders', config.folders[folderNameKey]);

      if (!fs.existsSync(filePath)){
        fs.mkdirSync(filePath);
      }
  });

  cb(null, {
    config: config,
    connection: dbConnection()
  });
}

module.exports = createConfigs;
