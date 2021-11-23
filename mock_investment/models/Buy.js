const mysql = require('mysql');
const app = require('../app');
const db = require('../config/db');
const dbconn = db.init();
const table = 'stock_buy_item';
const table2 = 'stock_sell_item';
const table3 = 'company_info';

module.exports = {
    buyStock : function(stock, price, user_idx, company_idx) {
        return new Promise ((resolve,reject)=> {
            var query = `select (select get_buy_price*sum(get_buy_stock) from stock_buy_item
                        where user_idx = ${user_idx} and company_idx = ${company_idx} group by company_idx) as buyPrice,
                        (select get_sell_price*sum(get_sell_stock) from stock_sell_item
                        where user_idx = ${user_idx} and company_idx = ${company_idx} group by company_idx) as sellPrice, assets 
                        from user_info 
                        where user_idx = ${user_idx}`;
            dbconn.query( query, (err,result,fields) =>
                {
                    if(err){
                        reject(err);
                    } else {
                        console.log(result);
                        let res = JSON.parse(JSON.stringify(result));
                        console.log(res);
                        console.log(res[0].assets - res[0].buyPrice + res[0].sellPrice);
                        console.log(stock*price);
                        if(res[0].assets - res[0].buyPrice + res[0].sellPrice > stock*price) {
                            console.log('매수 가능');
                            resolve(10);
                        } else {
                            resolve(20);
                            console.log('매수 불가능');
                        }
                    }
                })
        })
    },
    buystockFuntion : function(stock,price,idx,company_idx) {
        return new Promise ((resolve,reject)=> {
            console.log('function');
            var query = `insert into ${table} (get_buy_stock, get_buy_price , user_idx, company_Idx) values ('${stock}','${price}','${idx}','${company_idx}');` +
                        `select sum(b.get_buy_stock) as cnt from stock_buy_item b
                        inner join company_info c on b.company_idx = c.company_idx
                        where b.get_buy_price = c.company_stock `
            dbconn.query( query, (err,result,fields) =>
                {
                    if(err){
                        reject(err);
                    } else {
                        console.log(result);
                        let res = JSON.parse(JSON.stringify(result));
                        if(parseInt(res[1][0].cnt) > 5){
                            dbconn.query(`update company_info set company_stock = concat(company_stock + 500) where company_idx = '${company_idx}';`,(err,result,fields)=>
                            {
                                if(err){
                                    console.log(err);
                                    reject(err);
                                } else{
                                    resolve(10);
                                }
                            });
                        }
                       
                    }
                })
        })
    },
    sellStock : function(stock, price, user_idx, company_Idx) {
        return new Promise ((resolve, reject)=>{
            var query = `insert into ${table2} (get_sell_stock, get_sell_price, user_idx, company_Idx) values ('${stock}','${price}','${user_idx}','${company_Idx}');`+
                        `select sum(s.get_sell_stock) as cnt from stock_sell_item s
                        inner join company_info c on s.company_idx = c.company_idx
                        where s.get_sell_price = c.company_stock`
            dbconn.query(query, (err,result,fields) =>
                {
                    if(err){
                        console.log(err);
                        reject(err);
                    } else{
                        let res = JSON.parse(JSON.stringify(result)); 
                        if(parseInt(res[1][0].cnt) > 5){
                            dbconn.query(`update company_info set company_stock = concat(company_stock - 500) where company_idx = '${company_Idx}';`,(err,result,fields)=>
                            {
                                if(err){
                                    console.log(err);
                                    reject(err);
                                } else{
                                    resolve(10);
                                }
                            });
                        }
                    }
                }
            )
        })
    },

}