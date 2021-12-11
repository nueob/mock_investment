const mysql = require('mysql');
const app = require('../app');
const db = require('../config/db');
const dbconn = db.init();
const table = 'admin_info a';

module.exports={
    stockMoney : function (companyName) {
        var query = `select  c.* , sum(get_buy_stock) as cnt from ${table}
        left join stock_buy_item b on c.company_idx = b.company_idx
        where c.company_name like '%${companyName}%';` +
        `select (company_stock - company_before_stock) as different , ROW_NUMBER() OVER (ORDER BY different desc) as rank , company_stock , company_name
        from company_info;` ;
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
}
