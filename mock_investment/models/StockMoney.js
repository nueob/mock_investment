const mysql = require('mysql');
const app = require('../app');
const db = require('../config/db');
const dbconn = db.init();
const table = 'company_info c';

module.exports={
    // stockMoney : function (companyName) {
    //     var query = `select  c.* , sum(get_buy_stock) as cnt from ${table}
    //     left join stock_buy_item b on c.company_idx = b.company_idx
    //     where c.company_name like '%${companyName}%';` +
    //     `select (company_stock - company_before_stock) as different , ROW_NUMBER() OVER (ORDER BY different desc) as rank , company_stock , company_name
    //     from company_info;` ;
    //     return new Promise ((resolve, reject) => {
    //         dbconn.query(query, (err,result,fields) =>
    //             {
    //                 if(err){
    //                     reject(err);
    //                 } else {
    //                     let res = JSON.parse(JSON.stringify(result));
    //                     resolve(res);
    //                 }
    //         });
    //         // dbconn.end();
    //     })
    // },
    stockMoney : function(company) {
        return new Promise ((resolve, reject) => {
            dbconn.query(
                `select company_number,company_idx from company_info_kospi where company_name like '%${company}%'`, (err,result,fields) =>
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
    },
    chartMoney : function(company_Idx) {
        return new Promise ((resolve, reject) => {
            var timestamp = + new Date();

            dbconn.query(
                `insert into chart (date, start_price, high_price, low_price, end_price, company_idx) values (${timestamp},
            (select company_stock from company_info where company_idx = ${company_Idx}),
            (select company_stock from company_info where company_idx = ${company_Idx}),
            (select company_stock from company_info where company_idx = ${company_Idx}),
            (select company_stock from company_info where company_idx = ${company_Idx}),
            ${company_Idx})`, (err, result, fields) =>
            {
                if(err){
                    console.log(err);
                    reject(err);
                } else {
                    dbconn.query(`select * from chart where company_idx = ${company_Idx}`, (err,result,fields) =>
                    {
                        if(err){
                            console.log(err);
                            reject(err);
                        } else{
                            let res = JSON.parse(JSON.stringify(result));
                            // console.log(res);
                            resolve(res);
                        }
                    })

                }
            })
        })
    },
    test : function(){
        return new Promise ((resolve, reject) =>{
            dbconn.query(
                `select company_stock from company_info where company_idx = 1`, (err, result, fields)=>
                {
                    if(err){
                        reject(err);
                    }else{
                        let res = JSON.parse(JSON.stringify(result));
                        resolve(res);
                    }
                }
            )
        })
    },
    realMoney : function(titles){
        return new Promise ((resolve, reject)=>{
            dbconn.query(
                `insert into chart (start_price) values ${titles}`, (err, result, fields)=>
                {
                    if(err){
                        reject(err);
                    }else{
                        resolve(10);
                    }
                }
            )
        })
    }
}
