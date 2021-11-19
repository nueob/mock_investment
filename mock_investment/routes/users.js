//my주식창
var express = require('express');
var session = require('express-session');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('sample/ui-icons-bootstrap-icons', { title: 'Express' });
});

router.get('/my', function(req, res, next) {
  res.render('myInfo/my1', { title: 'Express', data: req.session.userNickname });
});

router.get('/asset', function(req, res, next) {
  res.render('myInfo/assetvalue', { title: 'Express' });
});





module.exports = router;
