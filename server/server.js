var express = require('express');
var _ = require('lodash');
var app = express();
var uuid = require('node-uuid');
var bodyParser = require('body-parser');

var locations = {};

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post('/api/location', function(req, res) {
  locations[req.body.uuid] = req.body.location;
  res.send(locations);
});

app.get('/api/init', function (req, res) {
  var response = {
    uuid: uuid.v4(),
    locations: locations
  };
  res.send(response);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})