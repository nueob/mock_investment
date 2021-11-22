const express = require('express');
const Comment = require('../models/CompanyComment');
const Buy = require('../models/Buy');
const router = require('../routes');
const StockMoney = require('../models/StockMoney');

module.exports = {
    // views
    doDiscussionView : function(req,res,next) {
        // Comment.getDiscussion(req.body.companyIdx)
        Comment.commnetList(1).then((result) =>{
            for (com of result ) {
                console.log(com.user_nickname);
            }
            console.log(result);
            res.render('stock-search/stock-discussion', { title: 'Express' , comment : result});
        })
    },
    doDiscussionSearch : function(req,res,next) {
        Comment.searchList(req.body.companyName).then((result) => {
            console.log(result);
            res.json(result);
        })
    },
    doDiscussionComment : function(req,res,next) {
        Comment.doComment(req.session.userIdx,req.body.companyIdx,req.body.comment).then((result)=>{
            console.log(result);
            res.json(result);
        }) 
    },
    getBuyStock : function(req,res,next){
            Buy.buyStock(req.body.stock, req.session.userIdx, req.body.company_Idx).then((result)=>{
                console.log(result);
                res.json(result);
        })        
    },
    viewPublicOffering : function(req,res,next) {
        res.render('stock-search/stock-public-offering', { title: 'Express'});
    },
    dopublicOffering : function(req,res,next) {
        StockMoney.publicOffering(req.session.userIdx,req.body.stock).then((result) => {
            console.log(result);
            res.json(result);
        })
    },
    sellStock : function(req,res,next){
        Buy.sellStock(req.body.stock,req.session.userIdx, req.body.company_Idx).then((result)=>{
            console.log(result);
            res.json(result);
        })
    },

    getStockMoney : function(req,res,next){
        StockMoney.stockMoney().then((result)=>{
            console.log(result);
            res.render('stock-search/stock-mongsim', {title: 'Express', money : result});

        })
    }
}