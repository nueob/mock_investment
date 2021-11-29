const axios = require("axios");
const cheerio = require("cheerio");
const Iconv=require('iconv-lite');
 
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
    
    const $bodyList = $("div.today");
    let titles = [];
    

    $bodyList.each((idx, elem)=> {
       
      titles['현재가']=String($(elem).find('p:nth-child(1)').text().trim());
     
      console.log(titles);
     
      
      
    });
 
    
 
  }
getData(381970);//종목코드