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
    host : 'localhost',
    port:3306,
    user : "hannam",
    password : "",
    database : "hannam"
  })
}));

/* view engine setup */

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


/* mysql 연동 연습 */

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

// app.get('/', (req,res)=>{
//   res.render("user-auth/auth-login", {title: 'Express'});
// })

// app.post('/', (req,res)=>{
//   res.render("user-auth/auth-login", {title: 'Express'});
  // var user = {
  //   user_name: '한남대',
  //   user_password: '1111'
  // };
  // var um = req.body.um;
  // var pwd = req.body.pwd;
    
  // if( um ===  user.user_name && pwd === user.user_password){
  //   req.session.displayname = req.body.displayname;  //이거 좌,우 순서만 바껴도 틀린다........
  //   res.render('dashboard/index', { title: 'Express' });
  // }else{
  //   res.send(um+','+pwd+'은 잘못된 아이디와 로그인입니다. <a href="/">login</a>');
  // }
// });

// app.get('/register', (req,res)=>{
//   res.render("user-auth/auth-register");
// });
// app.get('/', function(req,res){
//   req.session.count=1;
//   res.send('ge');
// });

// app.post('/register', (req,res)=>{
  // var user = {
  //   authId:'local'+req.body.id,
  //   username:req.body.id,
  //   password:req.body.password,
  //   displayname:req.body.display_name,
  //   email:req.body.email
  // };
  // var sql = "insert into users SET ?";
  // conn.query(sql, user, function(err,result){  //user라는 변수가 가리키는 객체가 sql로 담긴다.
  //     if(err){
  //       console.log(err);
  //       res.status(500);
  //     } else{
        // res.redirect('/');
  //     }
  // });
// });


// app.get('/logout', function(req, res, next){
  // res.send(req.session.displayname+'logout<a href="/">login</a>')
  // delete req.session.displayname; //여기서 세션 초기화
  // res.send(req.session.displayname+'hello'); //세션 초기화 됐는지 이걸로 확인해보면 됨.
// });

