var express = require('express');
var app = express();

app.get('/foo', function (req, res) {
  var response = {
    '10.1.2.3': {
      'lat': '61.111',
      'lon': '20.2020'
    }
  }
  res.send(response);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})
