const express = require('express');
const User = require('../models/User');
const router = require('../routes');

module.exports = {
    // views
    doLoginUser : function(req,res,next) {
        // 데이터 가져오기
        // User.getUser().then((result) => {
        //     res.render('user-auth/auth-login.ejs',{user:result});
        // })
        if(typeof req.session.userIdx != 'undefined') {
            res.render('dashboard/index',{ nickname : req.session.user_nickname });
        } else {
            res.render('user-auth/auth-login.ejs',{layout:'layouta'});
        }
    },
    doRegistUser : function(req,res,next) {
        res.render('user-auth/auth-register.ejs',{layout:'layouta'});
    },
    doPasswordUser : function(req,res,next) {
        res.render('user-auth/auth-forgot-password', {title: 'Express' ,layout:'layouta'});
    },
    doLogoutUser : function(req,res,next) {
        delete req.session.userIdx;
        delete req.session.userNickname;

        res.render('user-auth/auth-login.ejs', {title: 'Express'});
    },
    doDashbord : function(req,res,next) {
        res.render('dashbord/index', {title: 'Express'});
    },

    // data controllers
    loginProc : function(req,res,next) {
        User.findUser(req.body.username,req.body.password).then((result) =>{
            if(result != '') {
                req.session.userIdx = result.user_idx;
                req.session.userNickname = result.user_nickname;
                res.render('dashboard/index',{ nickname : result.user_nickname });
            } else {
                res.render('user-auth/auth-login.ejs');
            }
        })
    },

    doIdDupCheck : function(req,res,next) {
        console.log(req.body.id);
        User.idDupCheck(req.body.id).then((result) => {
            console.log(result);
            res.json(result);
        })
    },
    doNickDupCheck : function(req,res,next) {
        console.log(req.body.nickname);
        User.nickDupCheck(req.body.nickname).then((result) => {
            console.log(result);
            res.json(result);
        })
    },
    createUser : function(req,res,next) {
        var id = req.body.id;
        var name = req.body.name;
        var nickname = req.body.nickname;
        var password = req.body.password;

        User.save(id,name,nickname,password).then((result)=> {
            console.log(result);
            res.json(result);
        });
        
    },
}