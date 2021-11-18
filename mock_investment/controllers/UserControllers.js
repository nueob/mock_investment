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
        res.render('user-auth/auth-register.ejs');
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
                res.render('dashboard/index');
            } else {
                res.render('user-auth/auth-login.ejs');
            }
        })
    },
    createUser : function(req,res,next) {
        var name = req.body.display_name;
        var password = req.body.pass_word;
        var id = req.body.user_name;

        User.save(name, id, password).then((result)=> {
            // if(result != '') {
            //     res.render('dashboard/index');
            // } else {
            //     res.render('user-auth/auth-login.ejs');
            // }
            console.log(result);
            res.render('dashboard/index');
        });
        
    }
}