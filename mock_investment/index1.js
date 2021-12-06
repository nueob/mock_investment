const axios = require("axios");
const cheerio = require("cheerio");
const Iconv=require('iconv-lite');
const fs = require('fs');
const Path = require('path');
const { rejects } = require("assert");

// fs.readdir('poster', (err) => {
//   if(err){
//     console.error('poster 폴더가 없어 poster 폴더를 생성합니다.');
//     fs.mkdirSync('poster');
//   }
// })
 
const getHtml = async () => {
    try {
      return await axios.get("https://finance.naver.com/sise/",{responseEncoding : 'binary', responseType : 'arraybuffer'});
    } catch (error) {
      console.error(error);
    }
  }
 
const getData = async(keyword) => {
    const html = await getHtml(keyword);
    var img2;
    var span2;
    const content = Iconv.decode(html.data, "EUC-KR").toString(); //한글 깨짐 방지

    const $ = cheerio.load(content);
    // const $bodyList = $("#tab_sel1_sise_main_chart");
    // $bodyList.each((idx, elem)=> {
    //   var img = String($(elem).find('img:nth-of-type(1)').attr('src'));
    //   console.log(img);
    //   img2 = img;   
    // })
    // if (img2){
    //   const imgResult = await axios.get(img2, {
    //     responseType: 'arraybuffer',
    //   });
    //   fs.writeFileSync(`public/images/faces/test1.jpg`, imgResult.data);
    // }


    var $spanList = $("#tab_sel1_deal_trend").text().trim();
    console.log($spanList);
    
  // const html = await getHtml(keyword);
  
  // const content = Iconv.decode(html.data, "EUC-KR").toString(); //한글 깨짐 방지

  // const $ = cheerio.load(content);

  // var img = $('#img_chart_area').attr('src');
  // if (img){
  //   const imgResult = await axios.get(img, {
  //     responseType: 'arraybuffer',
  //   });
  //   console.log(imgResult);
  //   fs.writeFileSync(`public/images/faces/test1.jpg`, imgResult.data);
  // }
  // console.log(img);
  
  // const $bodyList = $("p.no_today");
  // let titles = [];
  // $bodyList.each((idx, elem)=> {
    
  //   titles=String($(elem).find('span:nth-of-type(1)').text().trim());
  //   titles=parseInt(titles.replace(',',''));
  //   console.log(titles);  
  // });
 
  }
getData();//종목코드
