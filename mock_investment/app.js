var createError = require('http-errors');
var expressLayouts = require('express-ejs-layouts');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

/* session */

var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
//var bodyParser = require('body-parser');
//app.use(bodyParser.urlencoded({ extended: false}));
app.use(session({
  secret: 'sdfdsf3',
  resave: false,
  saveUninitialized: true,
  store:new MySQLStore({
    host : '219.254.137.107',
    port:3306,
    user : "hannam",
    password : "",
    database : "hannam"
  })
}));

/* view engine setup */

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout','layout','layouta');
app.set('layout extractScriptes',true);
app.use(expressLayouts);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* router */

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mainRouter = require('./routes/main');
var searchRouter = require('./routes/stock-search');

app.use('/', indexRouter);
app.use('/main', mainRouter);
app.use('/search', searchRouter);
app.use('/users', usersRouter);

/* listen */

app.listen('3000', function(){
  console.log('success');
});

/* catch 404 and forward to error handler */

app.use(function(req, res, next) {
  next(createError(404));
});

/* error handler */

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;




