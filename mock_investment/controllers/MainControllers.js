const express = require('express');
const User = require('../models/User');
const router = require('../routes');

module.exports = {
    // views
    doMainView : function(req,res,next) {
        User.getRankPeople(req.session.userIdx).then((result) =>{
            console.log(result[0]);
            console.log(result[1]);
            res.render('dashboard/index', { title: 'Express' , rank : result , nickname: req.session.userNickname});
        })
    },
}