var fs = require('fs'),
    path = require('path'),
    parseFile = require('csv-parse');

function moveFile(src, dest, fileName, cb) {
  var src = path.resolve(src, fileName),
      dest = path.resolve(dest, fileName);

  fs.rename(src, dest, cb);
}

function saveFile(db, file, data, start, cb) {
  var payload = {
    Filename: file.name,
    TotalNumberOfRows: data.length,
    RowsWithErrors: 0, // check options for csv-parse
    StartDate: start,
    EndDate: new Date(),
    CreationDate: new Date()
  };

  db.query('INSERT INTO File SET ?', payload, cb); // check return value for logging
}

module.exports = function(req, res, next) {
  var db = req.app.get('dbConnection'),
      folders = req.app.get('globalConfig').folders,
      temp = folders.temp,
      processing = folders.processing,
      start;

  req.data.forEach(function(file, i){
    moveFile(temp, processing, file.name, function(){
      start = new Date();

      parseFile(file.file, {columns: true}, function(err, data){
        if (err) return next(err);

        saveFile(db, file, data, start, function(err, res, fields) {
          if (err) return next(err);

          if (i === req.data.length -1) {
            next();
          }
        });
      });
    });
  });
}
