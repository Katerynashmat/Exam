const fs = require('fs')
const path = require('path')
const port = process.env.PORT || 3000

var express = require("express");
var app = express();
const bodyParser = require('body-parser')
app.use(express.static('public'));
const db = require('./queries');

const urlencodedParser = bodyParser.urlencoded({extended: false});

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}
app.use(allowCrossDomain);



// app.post('/Login/Reristration.html', urlencodedParser, db.registration)

// app.post('/Login/Login.html', urlencodedParser, db.login)

app.get('/data', urlencodedParser, db.getTable)

app.get('*', (request, response) => {
  let filePath = path.join(__dirname, request.url === '/' ? '/index.html' : request.url)
  const ext = path.extname(filePath);
  let contentType = 'text/html'

  switch(ext){
    case '.css': 
      contentType = 'text/css'
      break;
    case '.js':
      contentType = 'text/javascript'
      break;
    default:
      contentType = 'text/html'
  }

  if(!ext){
    filePath += '.html';
  }
  
  fs.readFile(filePath, (err, data) =>{
    if(err){
        console.log(err)
      //throw err;
    }

    response.header({"Content-Type": contentType});
    response.end(data);
  })
});

var server = app.listen(port, function () {
  console.log("Server started at port:  ", port);
});