module.exports = function(req, cb) {

  var data = '';
  req
    .on('error', cb)
    .on('data', function(chunk){
      data += chunk;
    })
    .on('end', function(){
      return cb(null, data);
    });
}