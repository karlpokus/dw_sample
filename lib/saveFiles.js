var fs = require('fs'),
    path = require('path');

function pype(data, dir, fn, errorHandler, cb) {
  var i = 0,
      run = function() {
        fn(data[i++], dir, next);
      },
      next = function(err) {
        if (err && errorHandler) {
          return errorHandler.call(null, err);
        }
        if (i < data.length) {
          return run();
        } else if (cb) {
          cb();
        }
      }
  run();
}

function saveFileToDisk(file, dir, cb) {
  var filepath = path.resolve(__dirname, '../', 'folders', dir, file.name);

  fs
    .createWriteStream(filepath)
    .end(file.file, 'utf8', cb);
}

function errorHandler(err) {
  throw new Error(err);
}

module.exports = function(req, res, next) {
  var dir = req.app.get('globalConfig').folders.temp;
  pype(req.data, dir, saveFileToDisk, errorHandler, next);
}
