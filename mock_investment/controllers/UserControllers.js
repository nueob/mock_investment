const express = require('express');
const User = require('../models/User');
const router = require('../routes');

module.exports = {
    // views
    doMyPageView : function(req,res,next) {
        User.getMyInfo(req.session.userIdx).then((result) =>{
            res.render('myInfo/my1', { title: 'Express', nickname : req.session.userNickname , name: req.session.userName , result: result});
        })
    },
    doAssetView : function(req,res,next) {
        User.getAssetsInfo(req.session.userIdx).then((result) => {
            console.log(result);
            console.log(result[2][0]);
            res.render('myInfo/assetvalue', { title: 'Express' , info : result });
        } )
    },
    changeNickname : function(req,res,next) {
        User.changeNickname(req.session.userIdx,req.body.nickname).then((result)=>{
            req.session.userNickname = req.body.nickname;
            console.log(result);
            res.json(result);
        })
    },
    changePassword : function(req,res,next) {
        User.currentPasswordConfirm(req.session.userIdx,req.body.currentPassword,req.body.changePassword).then((result)=>{
            console.log(result);
            res.json(result);
        })
    },
    adlistView : function(req,res,next) {
        res.render('admin/adlist', { title: 'Express' ,layout:'layoutad'});
    },
    adminView : function(req,res,next) {
        res.render('admin/compet-setting', { title: 'Express' ,layout:'layoutad'});
    },
    homeView : function(req,res,next) {
        res.render('admin/home', { title: 'Express' ,layout:'layoutad'});
    },
    rankingView : function(req,res,next) {
        res.render('admin/ranking', { title: 'Express' ,layout:'layoutad'});
    },
    resultView : function(req,res,next) {
        res.render('admin/result', { title: 'Express' ,layout:'layoutad'});
    }
}