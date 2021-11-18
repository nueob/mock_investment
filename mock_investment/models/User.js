const mysql = require('mysql');
const db = require('../config/db');
const dbconn = db.init();
const table = 'user_info';

module.exports = {
    getUser : function () {
        return new Promise ((resolve,reject) => {
            dbconn.query(
                `select * from ${table}` , (err,result,fields) =>
                {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
            });
            dbconn.end();
        })
    },
    findUser : function (id,password) {
        return new Promise ((resolve,reject) => {
            dbconn.query(
                `select * from ${table} where user_id = ${id} and user_password = ${password}` , (err,result,fields) =>
                {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
            });
            dbconn.end();
        })
    },
    registUser : function (){
        return new Promise ((resolve, reject) => {
            dbconn.query(
                `insert into ${table} set ?`, (err,result,fields) =>
                {
                    if(err){
                        reject(err);
                    }else {
                        resolve(result);
                    }
            });
            dbcoon.end();
        })
    }
}