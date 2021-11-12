// 메인 창
var express = require('express');
var session = require('express-session');
var router = express.Router();

router.post('/', function(req, res, next){
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
  // if(req.session.displayname){
  //   res.render("dashboard/index");
  // } else{
  //   res.send("please login first");
  // }
  
});
module.exports = router;

/* session을 받을 수 있는 코딩 */
// router.post('/', function(req, res, next) {
//   if(req.session.count){
//     req.session.count++;
//   } else{
//     req.session.count = 1;
//   }
//   //res.render('dashboard/index', { title: 'Express' });
//   res.send('fianl : '+req.session.count);
// });
// module.exports = router;

// router.post('/', function(req, res, next){
//   var id = req.body.id;
//   var password = req.body.password;
//   var um = req.body.um;
//   var pwd = req.body.pwd;
//   if(req.body.id ===  req.body.um){
//     res.send(um+','+pwd);
//   }else{
    
//     res.send(id+','+password);
//   }

// });