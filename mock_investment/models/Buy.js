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
            dbconn.query( `insert into ${table} (get_buy_stock, user_idx, company_Idx) values ('${stock}','${user_idx}','${company_Idx}');`, (err,result,fields) =>
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