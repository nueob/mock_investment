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

module.exports = router;
