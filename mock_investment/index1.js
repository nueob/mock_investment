const axios = require("axios");
const cheerio = require("cheerio");
const Iconv=require('iconv-lite');
const fs = require('fs');

fs.readdir('poster', (err) => {
  if(err){
    console.error('poster 폴더가 없어 poster 폴더를 생성합니다.');
    fs.mkdirSync('poster');
  }
})
 
const getHtml = async (keyword) => {
    try {
      return await axios.get("https://finance.naver.com/item/sise.naver?code="+keyword,{responseEncoding : 'binary', responseType : 'arraybuffer'});
    } catch (error) {
      console.error(error);
    }
  }
 
const getData = async(keyword) => {
    const html = await getHtml(keyword);
    
    const content = Iconv.decode(html.data, "EUC-KR").toString(); //한글 깨짐 방지

    const $ = cheerio.load(content);
    
    const $bodyList = $("p.no_today");
    let titles = [];
    
    var img = $('#img_chart_area').attr('src');
    if (img){
      const imgResult = await axios.get(img, {
        responseType: 'arraybuffer',
      });
      console.log(imgResult);
      fs.writeFileSync(`poster/aa`, imgResult.data);
    }
    console.log(img);

    $bodyList.each((idx, elem)=> {
       
      titles=String($(elem).find('span:nth-of-type(1)').text().trim());
      titles=parseInt(titles.replace(',',''));
      // console.log(titles);
     
      
     
    });
 
    
 
  }
getData(381970);//종목코드
