const mysql = require('mysql');
const app = require('../app');
const db = require('../config/db');
const dbconn = db.init();
const table = 'company_info c';

module.exports={
    stockMoney : function (companyName) {
        return new Promise ((resolve, reject) => {
            dbconn.query(
                `select  c.* , sum(get_buy_stock) as cnt from ${table} 
                left join stock_buy_item b on c.company_idx = b.company_idx
                where c.company_name like '%${companyName}%'`, (err,result,fields) =>
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
    publicOffering : function(idx,stock) {
        return new Promise ((resolve, reject) => {
            var query = `select sum(stock) as count from public_offering where user_idx = ${idx}`;
            dbconn.query(query,(err,result,fields) => {
                if(err) {
                    reject(err);
                } else {
                    let res = JSON.parse(JSON.stringify(result));
                    if(parseInt(res[0].count) + parseInt(stock) > 5) {
                        resolve(100);
                    } else {
                        dbconn.query(
                            `insert into public_offering (user_idx,stock) values (${idx},${stock})`, (err,result,fields) =>
                            {
                                if(err){
                                    reject(err);
                                } else {
                                    resolve(result);
                                }
                        });
                    }
                }
            })
        })
    },
    doAbleOffering : function(idx) {
        return new Promise ((resolve, reject) => {
            dbconn.query(
                `select sum(stock) as count from public_offering where user_idx = ${idx}`, (err,result,fields) =>
                {
                    if(err){
                        reject(err);
                    } else {
                        let res = JSON.parse(JSON.stringify(result));
                        resolve(res[0].count);
                    }
            });
            // dbconn.end();
        })
    },
    companyInfo : function() {
        return new Promise ((resolve, reject) => {
            dbconn.query(
                `select * from company_info where company_idx = 1`, (err,result,fields) =>
                {
                    if(err){
                        reject(err);
                    } else {
                        let res = JSON.parse(JSON.stringify(result));
                        resolve(res[0]);
                    }
            });
            // dbconn.end();
        })
    }
}
