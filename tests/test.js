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

// helper
function readFiles(files) {
  return JSON.stringify(
    files.map(function(file){
      return {
        name: file,
        file: fs.readFileSync(path.resolve(__dirname, file), 'utf8')
      }
    }));
}

test('upload multiple files', function(t){
  var opts = {
    url: 'http://localhost:3000/data',
    method: 'POST',
    body: readFiles(['dummy_samples.csv', 'dummy_cats.csv'])
  };

  req(opts, function(err, res){
    t.error(err);
    t.equal(res.body, 'done');
    t.end();
  });
});
