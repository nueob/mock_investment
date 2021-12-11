const express = require('express');
const Admin = require('../models/Admin');
const router = require('../routes');

module.exports = {
    // views
    adlistView : function(req,res,next) {
        Admin.getUserInfo().then((result) => {
            console.log(result);
            res.render('admin/adlist', { title: 'Express' , layout:'layoutad' , user : result});
        })
    },
    adminView : function(req,res,next) {
        Admin.getCompetition().then((result) => {
            res.render('admin/compet-setting', { title: 'Express' ,layout:'layoutad' , competition : result});
        })
    },
    resultView : function(req,res,next) {
        Admin.getCompetitionDetail(req.query.idx,req.query.start,req.query.end).then((result) =>{
            res.render('admin/result', { title: 'Express' , layout:'layoutad', competition : result});
        })
    },
    // data function
    setCompetition : function(req,res,next) {
        Admin.setCompetition(req.body.titles,req.body.content,req.body.start,req.body.end,req.body.asset,req.session.adminIdx).then((result) =>{
            res.json(100);
        })
    }
}