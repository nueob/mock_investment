const express = require('express');
const User = require('../models/User');
const router = require('../routes');

module.exports = {
    // views
    doMainView : function(req,res,next) {
        User.getRankPeople(req.session.userIdx).then((result) =>{
            var first = 0;
            var second = 0;
            var third = 0;

            for(var i=0;i<result[3].length;i++) {
                if(third < result[3][i].different) {
                    if(second < result[3][i].different) {
                        if(first < result[3][i].different) {
                            first = result[3][i].different;
                        } else {
                            second = result[3][i].different;
                        }
                    } else {
                        third = result[3][i].different;
                    }
                } 
            }

            var firstArray = 0;
            var secondArray = 0;
            var thirdArray = 0;

            for (info of result[3]) {
                if(info.different == first) {
                    firstArray = info;
                } 
                if(info.different == second) {
                    secondArray = info;
                }
                if(info.different == third) {
                    thirdArray = info;
                }
            }

            console.log(firstArray);
            console.log(secondArray);
            console.log(thirdArray);

            res.render('dashboard/index', { title: 'Express' , rank : result , nickname: req.session.userNickname});
        })
    },
}