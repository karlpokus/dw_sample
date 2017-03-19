module.exports = function(req, res, next) {
  var data = '';
  req
    .on('error', next)
    .on('data', function(chunk){
      data += chunk;
    })
    .on('end', function(){
      try {
        req.data = JSON.parse(data);
        next();
      } catch(e) {
        next(e.message);
      }
    });
}
