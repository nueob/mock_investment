const express = require('express');
const User = require('../models/User');
const router = require('../routes');
const axios = require("axios");
const cheerio = require("cheerio");
const Iconv=require('iconv-lite');
const fs=require('fs');

module.exports = {
    // views
    doMainView : function(req,res,next) {
        User.getRankPeople(req.session.userIdx).then((result) =>{
            res.render('dashboard/index', { title: 'Express' , rank : result , nickname: req.session.userNickname});
        })
    },
    doPopularView : function(req,res,next) {
        const getHtml = async (keyword) => {
          try {
            return await axios.get("https://finance.naver.com/",{responseEncoding : 'binary', responseType : 'arraybuffer'});
          } catch (error) {
            console.error(error);
          }
        }
        const getData = async(keyword) => {
          const html = await getHtml(keyword);
          
          const content = Iconv.decode(html.data, "EUC-KR").toString(); //한글 깨짐 방지
    
          const $ = cheerio.load(content);
          
          const $bodyList = $("div.aside_popular tbody tr");
          let titles = [];
          let company = [];
          $bodyList.each((idx, elem)=> {
            company[idx] = {
              titles : String($(elem).find('a:nth-of-type(1)').text().trim()),
              price : String($(elem).find('td:nth-of-type(1)').text().trim()),
              state : String($(elem).find('td span.tah:nth-of-type(1)').text().trim()),
              src : $(elem).find('td img:nth-of-type(1)').attr('alt')
            };  
          });
          console.log(company);
          res.json(company);
        }
        getData(381970);//종목코드
    },
    doKospi: function(req,res,next){
      const getHtml = async () => {
        try {
          return await axios.get("https://finance.naver.com/sise/",{responseEncoding : 'binary', responseType : 'arraybuffer'});
        } catch (error) {
          console.error(error);
        }
      }
     
    const getData = async(keyword) => {
        const html = await getHtml(keyword);
        const content = Iconv.decode(html.data, "EUC-KR").toString(); //한글 깨짐 방지
        const $ = cheerio.load(content);
        const $bodyList = $("#tab_sel1_sise_main_chart");
        $bodyList.each((idx, elem)=> {
        var img = String($(elem).find('img:nth-of-type(1)').attr('src'));
        console.log(img);
        img2 = img;   
        })
        if (img2){
        const imgResult = await axios.get(img2, {
          responseType: 'arraybuffer',
        });
        fs.writeFileSync(`public/images/faces/kospi_img.jpg`, imgResult.data);
        }

        var $spanList = $("#tab_sel1_deal_trend").text().trim();
        console.log($spanList);
        res.json($spanList);
        
    }
    getData();
  }
}