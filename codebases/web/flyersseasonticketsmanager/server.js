
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var app = express();

var config = require('./server/config/config')[app.get('env')];

require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);

require('./server/config/passport');

require('./server/config/routes')(app);

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});