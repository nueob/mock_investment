const express = require('express');
const User = require('../models/User');
const router = require('../routes');

module.exports = {
    // views
    doMainView : function(req,res,next) {
        User.getRankPeople(req.session.userIdx).then((result) =>{
             for(info of result[3]) {
                 console.log(info.company_name);
             }
            res.render('dashboard/index', { title: 'Express' , rank : result , nickname: req.session.userNickname});
        })
    },
}