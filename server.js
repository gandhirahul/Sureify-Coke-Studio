var express = require("express");
var app     = express();
var path    = require("path");
var cookieParser = require('cookie-parser');

// cookie parser middleware
app.use(cookieParser());

app.use(express.static(__dirname + '/dist'));

app.get('*',function(req,res){
  res.sendFile(path.join(__dirname+'/dist/index.html'));
});

app.listen(process.env.PORT || 5000);

console.log("Running at Port 5000");