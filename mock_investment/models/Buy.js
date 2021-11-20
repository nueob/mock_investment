const mysql = require('mysql');
const app = require('../app');
const db = require('../config/db');
const dbconn = db.init();
const table = 'stock_buy_item';
const table2 = 'stock_sell_item';

module.exports = {
    buyStock : function(stock) {
        return new Promise ((resolve,reject)=> {
            dbconn.query(
                `insert into ${table} (get_buy_stock) values ('${stock}')`, (err,result,fields) =>
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

    sellStock : function(stock) {
        return new Promise ((resolve, reject)=>{
            dbconn.query(
                `insert into ${table2} (get_sell_stock) values ('${stock})`, (err,result,fields) =>
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