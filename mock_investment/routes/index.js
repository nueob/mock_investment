var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('user-auth/auth-login', { title: 'Express' });
});

router.get('/register', function(req, res, next){
  res.render('user-auth/auth-register', {title: 'Express'});
});
module.exports = router;

router.get('/password', function(req, res, next){
  res.render('user-auth/auth-forgot-password', {title: 'Express'});
});
module.exports = router;

router.get('/checkout', function(req, res, next){
  res.render('user-auth/application-checkout', {title: 'Express'});
});
module.exports = router;
