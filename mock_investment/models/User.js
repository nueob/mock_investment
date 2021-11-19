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
    save : function (id,name, nickname, password){
        return new Promise ((resolve, reject) => {
            dbconn.query(
                `insert into ${table} (user_id, user_name,user_nickname, user_password) values ('${id}', '${name}', '${nickname}','${password}')`, (err,result,fields) =>
                {
                    if(err){
                        console.log(err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
            });
            // dbconn.end();
        })
    },
    idDupCheck : function(id) {
        console.log(id);
        return new Promise ((resolve, reject) => {
            dbconn.query(
                `select count(*) as count from ${table} where user_id = '${id}'`, (err,result,fields) =>
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
    nickDupCheck : function (nickname) {
        console.log(nickname);
        return new Promise ((resolve, reject) => {
            dbconn.query(
                `select count(*) as count from ${table} where user_nickname = '${nickname}'`, (err,result,fields) =>
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
    }
}
