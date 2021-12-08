//my주식창
var express = require('express');
var session = require('express-session');
const UserControllers = require('../controllers/UserControllers');
var router = express.Router();

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
router.get('/list',userControllers.adlistView);
router.get('/setting',userControllers.adminView);
router.get('/home',userControllers.homeView);
router.get('/ranking',userControllers.rankingView);
router.get('/result',userControllers.resultView);

// router.get('/admin1',UserControllers.guideView);


module.exports = router;
