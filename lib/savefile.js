var fs = require('fs'),
    path = require('path');

module.exports = function(req, res, next) {

  /*
  var filepath = path.resolve(__dirname, '../', 'processing', req.data.name);

  fs
    .createWriteStream(filepath)
    .end(req.data.file, 'utf8', next);
    */

    req.data.forEach(function(o){
      console.log(o.name);
    });
    next();
}
