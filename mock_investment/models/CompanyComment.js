const mysql = require('mysql');
const app = require('../app');
const db = require('../config/db');
const dbconn = db.init();
const table = 'company_comment c';

module.exports = {
    commnetList : function(companyIdx) {
        return new Promise ((resolve,reject) => {
            dbconn.query(
                `select c.*,u.user_nickname from ${table} inner join user_info u on c.user_idx = u.user_idx
                where c.company_idx = ${companyIdx}` , (err,result,fields) =>
                {
                    console.log(result);
                    if(err) {
                        reject(err);
                    } else {
                        let res = JSON.parse(JSON.stringify(result));
                        resolve(res);
                    }
            });
        })
    },
    // searchList : function(companyName) {
    //     return new Promise ((resolve,reject) => {
    //         dbconn.query(
    //             `select c.*,company_name from company_info i inner join ${table} on c.company_idx = i.company_idx
    //             where i.company_name like '%${companyName}%'` , (err,result,fields) =>
    //             {
    //                 console.log(result);
    //                 if(err) {
    //                     reject(err);
    //                 } else {
    //                     let res = JSON.parse(JSON.stringify(result));
    //                     resolve(res);
    //                 }
    //         });
    //     })
    // },
    doComment : function(userIdx , companyIdx , comment) {
        return new Promise ((resolve,reject) => {
            dbconn.query(
                `insert into company_comment (user_idx, company_idx,comment) values ('${userIdx}', '${companyIdx}', '${comment}')` , (err,result,fields) =>
                {
                    console.log(result);
                    if(err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
            });
        })
    }
}
