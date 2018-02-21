var path    = require ("path");
var express = require ("express");
var app     = express ();

app.get ("/", (req, res) => {
  res.sendFile (path.resolve ("public/mazegame.html"));
});

app.use (express.static ("./public"));

var port = process.env.PORT || 2401;
app.listen (port, function () {
  console.log ("Listening on port ", port);
});
