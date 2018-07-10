// entry point of app
var config = require('./server/config/config');
var app = require('./server/server');

app.listen(3000);
console.log('server startred at http://localhost:' + config.port);
