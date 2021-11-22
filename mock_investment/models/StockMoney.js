const mysql = require('mysql');
const app = require('../app');
const db = require('../config/db');
const dbconn = db.init();
const table = 'company_info';

module.exports={
    stockMoney : function () {
        return new Promise ((resolve, reject) => {
            dbconn.query(
                `select company_stock from ${table} where company_idx = '1'`, (err,result,fields) =>
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
