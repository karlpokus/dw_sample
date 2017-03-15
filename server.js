var http = require('http'),
    server = http.createServer(),
    fs = require('fs'),
    url = require('url'),
    path = require('path'),
    port = process.env.PORT || 3000,
    client = path.join(__dirname, '/lib', 'client.html'),
    bodyParser = require('./lib/bodyparser'),
    parseCSV = require('csv-parse');

server.on('request', function(req, res){
  var pathName = url.parse(req.url).pathname;
    
  // router
  if (req.method === 'GET' && pathName === '/') {
    fs.createReadStream(client).pipe(res);
    
  } else if (req.method === 'POST' && pathName === '/data') {
    // process data
    bodyParser(req, function(err, str){
      if (err) {
        console.error(err);
        res.end(err);
      }
      
      console.log(str);
      res.statusCode = 200;
      res.end('data recieved');
    });
    
    
  } else {
    res.statusCode = 404;
    res.end('404');
  }
  
});

server.listen(port, function(){
  console.log('running');
});
