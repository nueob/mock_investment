const express = require('express');
const User = require('../models/User');

module.exports = {
    // views
    doLoginUser : function(req,res,next) {
        // 데이터 가져오기
        // User.getUser().then((result) => {
        //     res.render('user-auth/auth-login.ejs',{user:result});
        // })
        res.render('user-auth/auth-login.ejs',{user:result});
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

    // data controllers
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