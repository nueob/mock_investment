// 종목 검색 창
var express = require('express');
var router = express.Router();
var stockControllers = require('../controllers/StockControllers');

/* 종목 검색 page */
router.get('/', function(req, res, next) {
  res.render('stock-search/stock-mongsim', { title: 'Express' });
});

router.get('/yesunine', function(req, res, next) {
  res.render('stock-search/stock-yesunine', { title: 'Express'});
});

router.get('/companyInfo', function(req, res, next) {
  res.render('stock-search/stock-companyInfo', { title: 'Express' });
});

router.get('/discussion', stockControllers.doDiscussionView);
router.post('/discussion_comment', stockControllers.doDiscussionComment);
router.post('/discussion_search', stockControllers.doDiscussionSearch);

/* sample page */
router.get('/gallery', function(req, res, next) {
  res.render('sample/application-gallery', { title: 'Express' });
});

router.get('/divider', function(req, res, next) {
  res.render('sample/extra-component-divider', { title: 'Express' });
});

router.get('/model', function(req, res, next) {
  res.render('sample/component-modal', { title: 'Express' });
});

router.get('/table', function(req, res, next) {
  res.render('sample/table', { title: 'Express' });
});

router.get('/table/dataable', function(req, res, next) {
  res.render('sample/table-datatable', { title: 'Express' });
});

router.get('/select', function(req, res, next) {
  res.render('sample/form-element-select', { title: 'Express' });
});

router.get('/font', function(req, res, next) {
  res.render('sample/component-tooltip', { title: 'Express' });
});

router.get('/button', function(req, res, next) {
  res.render('sample/component-button', { title: 'Express' });
});

router.get('/layout/default', function(req, res, next) {
  res.render('sample/layout-default', { title: 'Express' });
});

router.get('/layout/horizontal', function(req, res, next) {
  res.render('sample/layout-horizontal', { title: 'Express' });
});

router.get('/layout/vertical', function(req, res, next) {
  res.render('sample/layout-vertical-1-column', { title: 'Express' });
});

router.get('/icon', function(req, res, next) {
  res.render('sample/ui-icons-bootstrap-icons', { title: 'Express' });
});

router.get('/input', function(req, res, next) {
  res.render('sample/form-element-input', { title: 'Express' });
});

module.exports = router;
