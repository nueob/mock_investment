var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('user-auth/auth-register', { title: 'Express' });
});

module.exports = router;