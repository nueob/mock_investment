//my주식창
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('sample/ui-icons-bootstrap-icons', { title: 'Express' });
});

router.get('/my', function(req, res, next) {
  res.render('dashboard/my', { title: 'Express' });
});

router.get('/asset', function(req, res, next) {
  res.render('dashboard/assetvalue', { title: 'Express' });
});
router.get('/my1', function(req, res, next) {
  res.render('dashboard/my1', { title: 'Express' });
});




module.exports = router;
