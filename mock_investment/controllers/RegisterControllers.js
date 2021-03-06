const express = require('express');
const User = require('../models/User');
const router = require('../routes');

module.exports = {
    // views
    doLoginUser : function(req,res,next) {
        if(typeof req.session.userIdx != 'undefined') {
            res.render('dashboard/index',{ nickname : req.session.userNickname });
        } else {
            res.render('user-auth/auth-login.ejs',{layout:'layouta'});
        }
    },
    doRegistUser : function(req,res,next) {
        res.render('user-auth/auth-register.ejs',{layout:'layouta'});
    },
    doPasswordUser : function(req,res,next) {
        res.render('user-auth/auth-forgot-password', {title: 'Express',layout:'layouta'});
    },
    doLogoutUser : function(req,res,next) {
        delete req.session.userIdx;
        delete req.session.userNickname;

        res.render('user-auth/auth-login.ejs', {title: 'Express',layout:'layouta'});
    },
    doDashbord : function(req,res,next) {
        res.render('dashbord/index', {title: 'Express'});
    },

    // data controllers
    loginProc : function(req,res,next) {
        User.adminUser(req.body.userId,req.body.password).then((admin) =>{
            if(admin == 100) {
                User.findUser(req.body.userId,req.body.password).then((result) =>{
                    console.log(result);
                    if(result != 100) {
                        req.session.userIdx = result.user_idx;
                        req.session.userNickname = result.user_nickname;
                        req.session.userName = result.user_name;
                    } 
                    res.json(result);
                })
            } else {
                req.session.adminIdx = admin.admin_idx;
                res.json(200);
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