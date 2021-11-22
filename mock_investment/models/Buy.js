const mysql = require('mysql');
const app = require('../app');
const db = require('../config/db');
const dbconn = db.init();
const table = 'stock_buy_item';
const table2 = 'stock_sell_item';
const table3 = 'company_info';

module.exports = {
    buyStock : function(stock, user_idx, company_Idx) {
        return new Promise ((resolve,reject)=> {
            var query = `insert into ${table} (get_buy_stock, user_idx, company_Idx) values ('${stock}','${user_idx}','${company_Idx}');` +
                        `select count(*) as cnt from stock_buy_item b
                        inner join company_info c on b.company_idx = c.company_idx
                        where b.get_buy_stock = c.company_stock `
            dbconn.query( query, (err,result,fields) =>
                {
                    if(err){
                        reject(err);
                    } else {
                        let res = JSON.parse(JSON.stringify(result));
                        
                        if(res[1][0].cnt > 5) {
                            this.updateGetMoney(company_Idx);
                        } else {
                            resolve(res[1][0].cnt);
                        }
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
    },

    updateGetMoney : function(company_Idx){
        return new Promise ((resolve, reject) =>{
            dbcoon.query(
                `update company_info set company_stock = concat(company_stock + 500) where company_idx = '${company_Idx}';`, (err,result,fields) =>
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