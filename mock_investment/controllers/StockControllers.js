const express = require('express');
const Comment = require('../models/CompanyComment');
const router = require('../routes');

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
    }
}