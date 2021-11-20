var express = require('express');
var router = express.Router();

var regiterControllers = require('../controllers/RegisterControllers');

router.get('/',regiterControllers.doLoginUser);
router.post('/', regiterControllers.loginProc);

router.get('/register',regiterControllers.doRegistUser);
router.post('/register',regiterControllers.createUser);

router.post('/idDupcheck',regiterControllers.doIdDupCheck);
router.post('/nickDupcheck',regiterControllers.doNickDupCheck);

router.get('/password',regiterControllers.doPasswordUser);

router.get('/logout',regiterControllers.doLogoutUser);

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

