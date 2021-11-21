const express = require('express');
const User = require('../models/User');
const router = require('../routes');

module.exports = {
    // views
    doMainView : function(req,res,next) {
        User.getRankPeople().then((result) =>{
            for (com of result ) {
                console.log(com.user_nickname);
            }
            console.log(result[0].user_nickname);
            res.render('dashboard/index', { title: 'Express' , rank : result , nickname: req.session.userNickname});
        })
    },
}