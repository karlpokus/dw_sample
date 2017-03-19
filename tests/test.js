// setup
var test = require('tape'),
    req = require('request'),
    fs = require('fs'),
    path = require('path'),
    app = require(path.resolve(__dirname, '../', 'server')),
    port = process.env.PORT || 3000;

// start
var server = app.listen(port, function(){
  console.log('App running on port', port);
});

// end
test.onFinish(server.close.bind(server));

test('simple upload', function(t){
  var fileName = 'dummy_sample.csv',
      payloads = JSON.stringify([{
        name: fileName,
        file: fs.readFileSync(path.resolve(__dirname, fileName), 'utf8')
      }]);

  var opts = {
    url: 'http://localhost:3000/data',
    method: 'POST',
    body: payloads
  };

  req(opts, function(err, res){
    t.error(err);
    t.equal(res.body, 'done');
    t.end();
  });

});
