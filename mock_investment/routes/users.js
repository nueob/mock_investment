//my주식창
var express = require('express');
var session = require('express-session');
var router = express.Router();

var adminControllers = require('../controllers/AdminControllers');
var userControllers = require('../controllers/UserControllers');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.render('sample/ui-icons-bootstrap-icons', { title: 'Express' });
// });

router.get('/', userControllers.doMyPageView);
// router.get('/my', userControllers.doMyPageView);

// router.get('/my', userControllers.doMyPageView);
router.post('/change_nickname', userControllers.changeNickname);
router.post('/change_password', userControllers.changePassword);

router.get('/asset', userControllers.doAssetView);

router.get('/setting',adminControllers.adminView);
router.post('/setCompetition',adminControllers.setCompetition);

router.get('/result',adminControllers.resultView);

router.get('/list',adminControllers.adlistView);

// router.get('/home',adminControllers.homeView);
// router.get('/ranking',adminControllers.rankingView);
// router.get('/admin1',UserControllers.guideView);


module.exports = router;
