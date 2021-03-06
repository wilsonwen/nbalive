var express = require('express');
var compression = require('compression');
var path = require('path');
var request = require('request');
var nba = require('nba-stats-client')
var cors = require('cors')
var fs = require('fs')
var app = express();
app.use(cors());
app.use(compression());

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/build'));

// Get datetime from timezone of NBA stat
function getDateTimeNBA() {
  var d = new Date()
  var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
  var mst = new Date(d.getTime() + (3600000*(-16)));
  console.log(mst)
  return mst
}


app.get('/scores', function(request, response){
  var mst = getDateTimeNBA()
  var year = mst.getFullYear()
  var month = mst.getMonth() + 1
  var date = mst.getDate() 
  nba.getGames(year, month, date).then(data => {
  	response.send(data)
  })
})

// For Test
app.get('/date', function(request, response){
  var mst = getDateTimeNBA()
  response.send(mst)
})

app.get('/nbastreams', function(request, response){
  testStream = 'data/streams.json'
  fs.readFile(testStream, function(err, data){
  	response.send(JSON.parse(data))
  })
})


app.get('*', function (request, response){
  console.log(path.resolve(__dirname, 'build', 'index.html'));
  response.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
