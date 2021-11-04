//my주식창
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('sample/ui-icons-bootstrap-icons');
});

module.exports = router;
