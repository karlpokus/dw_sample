// move file
// parse file
// insert
// next

var fs = require('fs'),
    path = require('path'),
    parse = require('csv-parse');

function addFileToDB(data, cb) {
  var db = req.app.get('dbConnection');
  query = db.query('INSERT INTO File SET ?', data, cb);
}

module.exports = function(req, res, next) {
  var start;

  req.data.forEach(function(file){ // file, name
    start = new Date();
    parse(o.file, {columns: true}, function(err, data){

      var payload = {
        Filename: file.name,
        TotalNumberOfRows: data.length,
        RowsWithErrors: 0, // check options for csv-parse
        StartDate: start,
        EndDate: new Date(),
        CreationDate: new Date()
      };

      addFileToDB(payload, function(err, res, fields) {
        //
      });

    });

  });

}
