const mysql = require('mysql');
const app = require('../app');
const db = require('../config/db');
const dbconn = db.init();
const table = 'admin_info a';

module.exports={
    getCompetition : function () {
        var query = `select * from competition_info;` ;
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
