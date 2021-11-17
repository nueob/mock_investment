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
        res.render('user-auth/auth-login.ejs');
    },
    doRegistUser : function(req,res,next) {
        res.render('user-auth/auth-login.ejs');
    },
    doPasswordUser : function(req,res,next) {
        res.render('user-auth/auth-forgot-password', {title: 'Express'});
    },
    doCheckoutUser : function(req,res,next) {
        res.render('user-auth/application-checkout', {title: 'Express'});
    },
    doDashbord : function(req,res,next) {
        res.render('dashbord/index', {title: 'Express'});
    },
    
    // data controllers
    loginProc : function(req,res,next) {
        User.findUser(req.body.username,req.body.password).then((result) =>{
            if(result != '') {
                res.render('stock-search/stock-search');
            } else {
                res.render('user-auth/auth-login.ejs');
            }
        })
    },
    createUser : function(req,res,next) {
        var user = new User();
        user.name = req.body.username;
        user.password = req.body.userpassword;
        user.id = req.body.userid;
        user.age = req.body.userage;

        user.save(function(err,user) {
            if(err) {
                console.error(err);
                res.json({result:0});
                return;
            }

            res.json({result:1});
        })
    }
}