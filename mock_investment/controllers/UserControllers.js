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
    // doDupCheck : function(req,res,next) {
    //     User.dupCheck(req.user_nickname).then((result) => {
    //         if(result > 0) {
    //             res.send("<script>alert('중복 된 닉네임입니다.')</script>");
    //         } else {
    //             res.send("<script>alert('사용 가능한 닉네임입니다.')</script>");
    //         }
    //     })
    // },
    createUser : function(req,res,next) {
        var id = req.body.user_id;
        var name = req.body.user_name;
        var nickname = req.body.user_nickname;
        var password = req.body.pass_word;

        User.save(id,name, nickname, password).then((result)=> {
            console.log(result);
            res.render('dashboard/index');
        });
        
    },
}