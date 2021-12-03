const express = require('express');
const Comment = require('../models/CompanyComment');
const Buy = require('../models/Buy');
const router = require('../routes');
const StockMoney = require('../models/StockMoney');
const axios = require("axios");
const cheerio = require("cheerio");
const Iconv=require('iconv-lite');

module.exports = {
    // views
    doDiscussionView : function(req,res,next) {
        var keyword = '';
        if(typeof req.body.company_name_input == 'undefined') {
            keyword = '룩';
        } else {
            keyword = req.body.company_name_input;
        }
        Comment.searchList(keyword).then((result) => { 
            res.render('stock-search/stock-discussion', { title: 'Express' , comment : result });    
        })
    },
    viewPublicOffering : function(req,res,next) {
        res.render('stock-search/stock-public-offering', { title: 'Express'});
    },
    viewCompanyInfo : function(req,res,next) {
        StockMoney.companyInfo().then((result)=>{
            console.log(result);
            res.render('stock-search/stock-companyInfo', { title: 'Express' , info:result});
        })
    },
    getStockMoney : function(req,res,next) {
        var keyword = '';
        console.log(typeof req.body.searching);
        console.log(typeof req.body.searching == 'undefined');
        if(typeof req.body.searching == 'undefined') {
            keyword = '카카오페이';
        } else {
            keyword = req.body.searching;
        }
        console.log(keyword);
        StockMoney.stockMoney(keyword).then((result)=>{
            console.log(result);
            const getHtml = async (keyword) => {
                try {
                    return await axios.get("https://finance.naver.com/item/sise.naver?code="+keyword,{responseEncoding : 'binary', responseType : 'arraybuffer'});
                } catch (error) {
                    console.error(error);
                }
            }
            const getData = async(code,id) => {
                const html = await getHtml(code);
                
                const content = Iconv.decode(html.data, "EUC-KR").toString(); //한글 깨짐 방지
            
                const $ = cheerio.load(content);
                
                const $bodyList = $("div.rate_info");
                let company = [];
                $bodyList.each((idx, elem)=> {
                    company[idx] = {
                        code : id,
                        titles : String($(elem).find('dl.blind dt:nth-of-type(1)').text().trim()), 
                        price : String($(elem).find('p.no_today span:nth-of-type(1)').text().trim()),

                        previous_day_price : String($(elem).find('tr:nth-of-type(1) td.first span.blind').text().trim()), //전일
                        high_price : String($(elem).find('tr:nth-of-type(1) td:nth-of-type(2) em.no_down span:nth-of-type(1)').text().trim()), //고가
                        trading_volume: String($(elem).find('tr:nth-of-type(1) td:nth-of-type(3) em span:nth-of-type(1)').text().trim()), //거래량

                        market_price : String($(elem).find('tr:nth-of-type(2) td.first span.blind').text().trim()), //시가
                        low_price : String($(elem).find('tr:nth-of-type(2) td:nth-of-type(2) em.no_down span:nth-of-type(1)').text().trim()), //저가
                        transaction_amount : String($(elem).find('tr:nth-of-type(2) td:nth-of-type(3) em span:nth-of-type(1)').text().trim()), //저가
                    }
                });
                console.log(company[0]);  
                res.render('stock-search/stock-search', {title: 'Express', company : company[0]});
            }
            getData(result.company_number,result.company_idx);//종목코드
        })
    },
    getStockMoneyTest : function(req,res,next) {
        res.render('stock-search/stock-search', {title: 'Express'});
    },
    //data-controllers
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
            Buy.buyStock(req.body.stock, req.body.price,req.session.userIdx, req.body.company_Idx).then((result)=>{
                console.log(result);
                if(result == 10) {
                    Buy.buystockFuntion(req.body.stock, req.body.price,req.session.userIdx, req.body.company_Idx).then((action)=>{
                        console.log('zz');
                        console.log(action);
                        res.json(action);
                    })
                } else {
                    res.json(result);
                }
        })        
    },
    dopublicOffering : function(req,res,next) {
        StockMoney.publicOffering(req.session.userIdx,req.body.stock).then((result) => {
            console.log(result);
            res.json(result);
        })
    },
    doAbleOffering : function(req,res,next) {
        StockMoney.doAbleOffering(req.session.userIdx).then((result) => {
            console.log(result);
            res.json(result);
        })
    },
    sellStock : function(req,res,next){
        Buy.sellStock(req.body.stock,req.body.price,req.session.userIdx, req.body.company_Idx).then((result)=>{
            if(result == 10) {
                Buy.sellStockFunction(req.body.stock,req.body.price,req.session.userIdx, req.body.company_Idx).then((action) => {
                    res.json(action)
                })
            } else {
                res.json(result);    
            }
        })
    },    
    getChartStock: function(req,res,next){
        StockMoney.chartMoney(req.body.company_Idx).then((result)=>{
            console.log(result);
            res.json(result);
        })
    },
    test: function(req,res,next){
        StockMoney.test().then((result)=>{
            console.log(result);
            res.json(result);
        })
    },
    insertMoney: function(req,res,next){
        StockMoney.realMoney(req.body.titles).then((result)=>{
            console.log(result);
            res.json(result);
        })
    }
}