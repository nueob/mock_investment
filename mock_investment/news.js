const axios = require("axios");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");

const getHtml = async (keyword) => {
  try {
    return await axios.get("https://finance.naver.com/item/news_news.naver?code="+keyword+"&page=&sm=title_entity_id.basic&clusterId=",{responseEncoding : 'binary', responseType : 'arraybuffer'});
  } catch (error) {
    console.error(error);
  }
}
const getData = async(keyword) => {
    const html = await getHtml(keyword);
    
    const content = iconv.decode(html.data, "EUC-KR").toString(); //한글 깨짐 방지

    const $ = cheerio.load(content);
    
    const $bodyList = $(".type5 tbody tr");
    let titles = [];
    

    $bodyList.each((idx, elem)=> {
      titles.push($(elem).find('.first td.title').text().trim());
      titles.push($(elem).find('.relation_tit td.title').text().trim());
      titles.push($(elem).find('.relation_lst td.title').text().trim());
     

      
    });
    titles.forEach(item=>console.log(item));
 
  }
getData(336260);//종목코드