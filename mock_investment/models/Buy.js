const mysql = require('mysql');
const app = require('../app');
const db = require('../config/db');
const dbconn = db.init();
const table = 'stock_buy_item';
const table2 = 'stock_sell_item';
const table3 = 'company_info';

module.exports = {
    buyStock : function(stock, user_idx, company_Idx, stock_count) {
        return new Promise ((resolve,reject)=> {
            var query = `insert into ${table} (get_buy_stock, user_idx, company_Idx) values ('${stock}','${user_idx}','${company_Idx}');` + //산 주식 채우기
                        `update ${table3} set company_stock_count = company_stock_count - ${Number(stock_count)} where company_idx = '1';`;
            dbconn.query(
                query, (err,result,fields) =>
                {
                    if(err){
                        console.log(err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            )
        })
    },

    sellStock : function(stock, user_idx, company_Idx) {
        return new Promise ((resolve, reject)=>{
            dbconn.query(
                `insert into ${table2} (get_sell_stock, user_idx, company_Idx) values ('${stock}','${user_idx}','${company_Idx}')`, (err,result,fields) =>
                {
                    if(err){
                        console.log(err);
                        reject(err);
                    } else{
                        resolve(result);
                    }
                }
            )
        })
    }
}