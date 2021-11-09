// 메인 창
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('dashboard/index', { title: 'Express' });
});
module.exports = router;

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

// router.post('/', function(req, res, next){
//     var id = req.body.id;
//     var password = req.body.password;
//     var um = req.body.um;
//     var pwd = req.body.pwd;
//     if(req.body.um ===  "ntweety"){
//       res.render('dashboard/index', { title: 'Express' });
//     }else{
//       res.send(um+','+pwd);
//     }
  
//   });
//   module.exports = router;
