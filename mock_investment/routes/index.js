var express = require('express');
var router = express.Router();

var userController = require('../controllers/UserControllers');

router.get('/',userController.doLoginUser);
router.post('/', userController.loginProc);

router.get('/register',userController.doRegistUser);
router.post('/register',userController.createUser);

router.post('/idDupcheck',userController.doIdDupCheck);
router.post('/nickDupcheck',userController.doNickDupCheck);

router.get('/password',userController.doPasswordUser);

router.get('/checkout',userController.doCheckoutUser);

module.exports = router;

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('user-auth/auth-login', { title: 'Express' });
// });
// module.exports = router;

// router.post('/', function(req,res,error){
//   var password = req.body.password;
//   var id = req.body.id;
//   res.render('user-auth/auth-login', { title: 'Express' });
// })
// module.exports = router;

// router.get('/register', function(req, res, next){
//   res.render('user-auth/auth-register', {title: 'Express'});
// });
// module.exports = router;

// router.get('/password', function(req, res, next){
//   res.render('user-auth/auth-forgot-password', {title: 'Express'});
// });
// module.exports = router;

// router.get('/checkout', function(req, res, next){
//   res.render('user-auth/application-checkout', {title: 'Express'});
// });

