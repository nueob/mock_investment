const express = require('express');
const Admin = require('../models/Admin');
const router = require('../routes');

module.exports = {
    // views
    adlistView : function(req,res,next) {
        res.render('admin/adlist', { title: 'Express' ,layout:'layoutad'});
    },
    adminView : function(req,res,next) {
        res.render('admin/compet-setting', { title: 'Express' ,layout:'layoutad'});
    },
    homeView : function(req,res,next) {
        res.render('admin/home', { title: 'Express' ,layout:'layoutad'});
    },
    rankingView : function(req,res,next) {
        res.render('admin/ranking', { title: 'Express' ,layout:'layoutad'});
    },
    resultView : function(req,res,next) {
        res.render('admin/result', { title: 'Express' ,layout:'layoutad'});
    }
}