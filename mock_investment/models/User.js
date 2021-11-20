const mysql = require('mysql');
const app = require('../app');
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
                `select user_idx,user_nickname from ${table} where user_id = '${id}' and user_password = '${password}'` , (err,result,fields) =>
                {
                    if(err) {
                        reject(err);
                    } else {
                        console.log('model');
                        if(typeof result == 'undefined' || result == "" || result.length == 0 || result == null) {
                            resolve(100);
                        } else {
                            let res = JSON.parse(JSON.stringify(result));  
                            resolve(res[0]);  
                        }
                    }
            });
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
    },
    changeNickname : function(idx,nickname) {
        console.log('model');
        console.log(idx);
        console.log(nickname);
        return new Promise ((resolve, reject) => {
            dbconn.query(
                `update ${table} set user_nickname = '${nickname}' where user_idx = ${idx}`, (err,result,fields) =>
                {
                    if(err){
                        reject(err);
                    } else {
                        resolve(result);
                    }
            });
            // dbconn.end();
        })
    },
    currentPasswordConfirm: function(idx,currentPassword,changePassword) {
        console.log('model');
        console.log(idx);
        console.log(currentPassword);
        console.log(changePassword);
        return new Promise ((resolve, reject) => {
            dbconn.query(
                `select count(*) as count from ${table} where user_idx = ${idx} and user_password = ${currentPassword}`, (err,result,fields) =>
                {
                    if(err){
                        reject(err);
                    } else {
                        let res = JSON.parse(JSON.stringify(result));
                        
                        if(res[0].count > 0) {
                            this.changePassword(idx,changePassword);
                        } else {
                            resolve(100);
                        }
                    }
            });
            // dbconn.end();
        })
    },
    changePassword : function(idx,changePassword) {
        console.log('changePassword');
        return new Promise ((resolve, reject) => {
            dbconn.query(
                `update ${table} set user_password =  ${changePassword} where user_idx = ${idx}`, (err,result,fields) =>
                {
                    if(err){
                        reject(err);
                    } else {
                        resolve(200);
                    }
            });
            // dbconn.end();
        })
    }
}
