var express = require('express');
var path = require('path');
//var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var apiLogin = require('./routes/login');
var apiEnccuesta = require('./routes/encuesta');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api', apiLogin);
app.use('/api', apiEnccuesta);


/// catch 404 and forwarding to error handler

var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log('http://localhost:' + PORT);
});

