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
    setCompetition : function(titles,start,end,asset,adminIdx) {
        var query = `insert into competition_info (admin_idx,titles,competition_start_date,competition_end_date,underlying_asset) 
        values ('${adminIdx}', '${titles}', '${start}','${end}','${asset}')` ;
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
    }
}
