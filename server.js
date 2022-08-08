// const express = require('express');
// const port = process.env.PORT || 8080;
//
// const serveStatic = require("serve-static")
// const path = require('path');
//
// app = express();
//
// app.use(serveStatic(path.join(__dirname, 'dist')));
// app.listen(port);
// //
// app.listen(process.env.PORT || 3000, function(){
//   console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
// });


const express = require('express');
const path = require('path');
const history = require('connect-history-api-fallback');
const app = express();
const staticFileMiddleware = express.static(path.join(__dirname + '/dist'));
app.use(staticFileMiddleware);
app.use(history({  disableDotRule: true,  verbose: true}));
app.use(staticFileMiddleware);
app.get('/', function (req, res) {
  res.render(path.join(__dirname + '/dist/index.html'));
});
var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});
