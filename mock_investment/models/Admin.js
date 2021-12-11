const mysql = require('mysql');
const app = require('../app');
const db = require('../config/db');
const dbconn = db.init();
const table = 'admin_info a';

module.exports={
    getCompetition : function () {
        var query = `select *,date_format(competition_start_date,'%Y-%m-%d') as start,date_format(competition_end_date,'%Y-%m-%d') as end from competition_info;` ;
        return new Promise ((resolve, reject) => {
            dbconn.query(query, (err,result,fields) =>
                {
                    if(err){
                        reject(err);
                    } else {
                        let res = JSON.parse(JSON.stringify(result));
                        resolve(res);
                    }
            });
            // dbconn.end();
        })
    },
    setCompetition : function(titles,content,start,end,asset,adminIdx) {
        var query = `insert into competition_info (admin_idx,titles,content,competition_start_date,competition_end_date,underlying_asset) 
        values ('${adminIdx}', '${titles}','${content}','${start}','${end}','${asset}')` ;
        return new Promise ((resolve, reject) => {
            dbconn.query(query, (err,result,fields) =>
                {
                    if(err){
                        reject(err);
                    } else {
                        resolve(result);
                    }
            });
            // dbconn.end();
        })
    },
    getCompetitionDetail : function(idx,start,end) {
        console.log(idx);
        var query = `select c.*,date_format(competition_start_date,"%Y-%m-%d") as start ,date_format(competition_end_date,"%Y-%m-%d") as end 
        from competition_info c
        where competition_idx = ${idx};` +
        `select  ROW_NUMBER() OVER (ORDER BY a.all_assest desc) as rank , user_nickname, user_name , all_assest 
        from user_info u , 
        (select (sum(get_buy_price) - sum(get_sell_price)) as all_assest 
        from stock_buy_item b
        left join stock_sell_item s on b.user_idx = s.user_idx
        where date_format(b.create_dt,"%Y-%m-%d") > '${start}' and date_format(b.create_dt,"%Y-%m-%d") < '${end}' and
              date_format(s.create_dt,"%Y-%m-%d") > '${start}' and date_format(s.create_dt,"%Y-%m-%d") < '${end}'
        group by b.user_idx) as a` ;
        return new Promise ((resolve, reject) => {
            dbconn.query(query, (err,result,fields) =>
                {
                    if(err){
                        reject(err);
                    } else {
                        let res = JSON.parse(JSON.stringify(result));
                        resolve(res);
                    }
            });
            // dbconn.end();
        })
    }
}
