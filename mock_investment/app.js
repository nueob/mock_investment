var createError = require('http-errors');
var expressLayouts = require('express-ejs-layouts');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
//var bodyParser = require('body-parser');

var usersRouter = require('./routes/users');
// var mainRouter = require('./routes/main');
var searchRouter = require('./routes/stock-search');
const expressEjsLayouts = require('express-ejs-layouts');

var mysql = require('mysql');
var conn = mysql.createConnection({
  host : 'localhost',
  user : "root",
  password : "",
  database : "o2"
});
conn.connect();
var app = express();
//app.use(bodyParser.urlencoded({ extended: false}));
app.use(session({
  secret: 'sdfdsf3',
  resave: false,
  saveUninitialized: true,
  store:new MySQLStore({
    host : 'localhost',
    port:3306,
    user : "root",
    password : "",
    database : "o2"
  })
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

// app.use('/main', mainRouter);
app.use('/search', searchRouter);
app.use('/users', usersRouter);

app.get('/', (req,res)=>{
  res.render("user-auth/auth-login", {title: 'Express'});
})

app.get('/register', (req,res)=>{
  res.render("user-auth/auth-register");
});

app.post('/register', (req,res)=>{
  var user = {
    authId:'local'+req.body.user_name,
    username:req.body.user_name,
    password:req.body.pass_word,
    displayname:req.body.display_name,
    email:req.body.email
  };
  if(req.body.pass_word === req.body.confirm_password){
    var sql = "insert into users SET ?";
    conn.query(sql, user, function(err,result){  //user라는 변수가 가리키는 객체가 sql로 담긴다.
        if(err){
          console.log(err);
          res.status(500);
        } else{
          res.redirect('/');
        }
    });
  }else{
    res.send('비밀번호가 다릅니다. 다시 입력해주세요.<a href="/register">register</a>');
  }
});

// app.get('/main', (req, res)=>{
//   res.render('dashboard/index');
// });

app.post('/main', (req, res)=>{
  var username = req.body.username;
  var password = req.body.password;
  conn.query('select * from users where username=?',[username], function( error, results, fields){
    if(error){
      res.send('failed');
    }else{
      if(results.length > 0) {
        if (results[0].password == password){
          req.session.username = req.body.username;  //이거 좌,우 순서만 바껴도 틀린다........
          res.render('dashboard/index');
        }else{
          res.redirect('/fail');
        }
      }else{
        res.redirect('/fail');
      }
    }
  });
});
app.get('/fail', (req,res)=>{
  res.render('user-auth/auth-fail-login');
});

app.get('/logout', function(req, res, next){
  res.send(req.session.username+'logout<a href="/">login</a>');
  delete req.session.username; //여기서 세션 초기화
  // res.send(req.session.displayname+'hello'); //세션 초기화 됐는지 이걸로 확인해보면 됨.
});

app.get('/password', (req,res)=>{
  res.render('user-auth/auth-forgot-password', {title: 'Express'});
});

app.post('/password', (req,res)=>{
  var forgot_email = req.body.forgot_email;
  var forgot_displayname = req.body.displayname;
  var forgot_username = req.body.forgot_username;
  conn.query('select * from users where username=?',[forgot_username], function(error, results, fields){
    if(error){
      res.send('failed');
    }else{
      if(results.length > 0){
        if (results[0].email == forgot_email && results[0].displayname == forgot_displayname){
          res.send(results[0].password);
        }else{
          res.send('틀렷어');
        }
      }else{
        res.send('틀렷어');
      }
    }
  });
});


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

