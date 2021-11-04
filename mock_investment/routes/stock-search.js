// 종목 검색 창
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('sample/index2', { title: 'Express' });
});

router.get('/sample', function(req, res, next) {
  res.render('sample/ui-widgets-todolist', { title: 'Express' });
});

router.get('/stock', function(req, res, next) {
  res.render('stock-search/stock-search', { title: 'Express' });
});

module.exports = router;
