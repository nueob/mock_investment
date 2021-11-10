var createError = require('http-errors');
var expressLayouts = require('express-ejs-layouts');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session');
//var bodyParser = require('body-parser');

//var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mainRouter = require('./routes/main');
var searchRouter = require('./routes/stock-search');
const expressEjsLayouts = require('express-ejs-layouts');

var app = express();
//app.use(bodyParser.urlencoded({ extended: false}));
app.use(session({
  secret: 'sdfdsf3',
  resave: false,
  saveUninitialized: true
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout','layout');
app.set('layout extractScriptes',true);
app.use(expressLayouts);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/main', mainRouter);
app.use('/search', searchRouter);
app.use('/users', usersRouter);

app.get('/', (req,res)=>{
  res.render("user-auth/auth-login", {title: 'Express'});
})

app.post('/', (req,res)=>{
  var user = {
    user_name: '한남대',
    user_password: '1111'
  };
  var um = req.body.um;
  var pwd = req.body.pwd;
    
  if( um ===  user.user_name && pwd === user.user_password){
    req.session.displayname = req.body.displayname;  //이거 좌,우 순서만 바껴도 틀린다........
    res.render('dashboard/index', { title: 'Express' });
  }else{
    res.send(um+','+pwd+'은 잘못된 아이디와 로그인입니다. <a href="/">login</a>');
  }
});

app.get('/register', (req,res)=>{
  res.render("user-auth/auth-register");
});
// app.get('/', function(req,res){
//   req.session.count=1;
//   res.send('ge');
// });
app.listen('3000', function(){
  console.log('success');
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


//mysql 연동 연습
// var mysql = require('mysql');
// var connection = mysql.createConnection({
//   host : 'localhost',
//   user : "root",
//   password : "",
//   database : "o2"

// });

// connection.connect();
// var sql = "select * from topic";
// connection.query(sql, function(err, rows, fields) {
//   if (err) {
//     console.log(err);
//   }else{
//     console.log('rows', rows);
//     console.log('fields', fields);
//   }
// });
// connection.end();

// var sql = "insert into topic (id, description, author) values('3', 'nodejs','ungung')";
// connection.query(sql, function(err, rows, fields){
//   if(err){
//     console.log(err);
//   } else {
//     console.log(rows);
//   }
// });
// connection.end();

