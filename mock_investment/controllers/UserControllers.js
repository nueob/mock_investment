const express = require('express');
const User = require('../models/User');
const router = require('../routes');

module.exports = {
    // views
    doMyPageView : function(req,res,next) {
        User.getMyInfo(req.session.userIdx).then((result) =>{
            res.render('myInfo/my1', { title: 'Express', data : req.session.userNickname , result: result});
        })
    },
    doAssetView : function(req,res,next) {
        res.render('myInfo/assetvalue', { title: 'Express' });
    },
    changeNickname : function(req,res,next) {
        console.log('controller');
        console.log(req.body.nickname);
        User.changeNickname(req.session.userIdx,req.body.nickname).then((result)=>{
            req.session.userNickname = req.body.nickname;
            console.log(result);
            res.json(result);
        })
    },
    changePassword : function(req,res,next) {
        console.log('controller');
        console.log(req.body.currentPassword);
        console.log(req.body.changePassword);
        User.currentPasswordConfirm(req.session.userIdx,req.body.currentPassword,req.body.changePassword).then((result)=>{
            console.log(result);
            res.json(result);
        })
    }
}