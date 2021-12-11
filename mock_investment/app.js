var createError = require('http-errors');
var expressLayouts = require('express-ejs-layouts');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
const axios = require("axios");
const cheerio = require("cheerio");
const Iconv=require('iconv-lite');
const fs=require("fs");

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
    host : '211.192.15.176',
    port:3306,
    user : "hannam",
    password : "",
    database : "hannam"
  })
}));

/* view engine setup */

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout','layout','layouta','layoutad');
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

app.use('/', mainRouter);
app.use('/login', indexRouter);
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


// 크롤링해서 들고온 현재가

// const getHtml = async (keyword) => {
//   try {
//     return await axios.get("https://finance.naver.com/item/sise.naver?code="+keyword,{responseEncoding : 'binary', responseType : 'arraybuffer'});
//   } catch (error) {
//     console.error(error);
//   }
// }
// const getData = async(keyword) => {
//   const html = await getHtml(keyword);
  
//   const content = Iconv.decode(html.data, "EUC-KR").toString(); //한글 깨짐 방지

//   const $ = cheerio.load(content);

//   var img = $('#img_chart_area').attr('src');
//   if (img){
//     const imgResult = await axios.get(img, {
//       responseType: 'arraybuffer',
//     });
//     console.log(imgResult);
//     fs.writeFileSync(`public/images/faces/test1.jpg`, imgResult.data);
//   }
//   console.log(img);
  
//   const $bodyList = $("p.no_today");
//   let titles = [];
//   $bodyList.each((idx, elem)=> {
    
//     titles=String($(elem).find('span:nth-of-type(1)').text().trim());
//     titles=parseInt(titles.replace(',',''));
//     console.log(titles);  
//   });
// }
// getData(381970);//종목코드


