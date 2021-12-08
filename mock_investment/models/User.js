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
    // login
    findUser : function (id,password) {
        return new Promise ((resolve,reject) => {
            dbconn.query(
                `select user_idx,user_nickname,user_name from ${table} where user_id = '${id}' and user_password = '${password}'` , (err,result,fields) =>
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
    // register
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
    //main
    getRankPeople : function (idx) {
        return new Promise ((resolve, reject) => {
            var query = `select ROW_NUMBER() OVER (ORDER BY assets desc) as rank, user_nickname  from ${table} order by assets limit 3;` +
                        `select ROW_NUMBER() OVER (ORDER BY assets desc) as my_rank from ${table} where user_idx = ${idx};` +
                        `select (company_stock - company_before_stock) as different , ROW_NUMBER() OVER (ORDER BY different desc) as rank , company_stock , company_name
                        from company_info
                        limit 3;` +
                        `select * from company_news`;
            dbconn.query(query, (err,result,fields) =>
                {
                    if(err){
                        reject(err);
                    } else {
                        let res = JSON.parse(JSON.stringify(result));
                        console.log(result);
                        resolve(res);
                    }
            });
            // dbconn.end();
        })
    },
    // myinfo
    getMyInfo : function(idx) {
        return new Promise ((resolve, reject) => {
            var query = `select assets from ${table} where user_idx = ${idx};` + //보유 자산

                        `select (sum(get_buy_price) - sum(get_sell_price)) as share,
                         (sum(get_buy_stock) - sum(get_sell_stock)) as allAssets , (assets - sum(get_buy_price) + sum(get_sell_price)) as realAssets
                        from stock_buy_item b
                        inner join user_info u on b.user_idx = u.user_idx
                        left join stock_sell_item s on b.company_idx = s.company_idx
                        where b.user_idx = ${idx};` + // 보유 주, 보유 주식 총액

                        // `select company_name, get_buy_stock as stock , '매수 준비 중' as memo ,
                        // (select count(*) from stock_buy_item b2 where b2.company_idx = b.company_idx and b2.get_buy_stock = b.get_buy_stock group by get_buy_stock) as cnt
                        // from stock_buy_item b
                        // inner join company_info c on b.company_idx = c.company_idx
                        // where b.user_idx = ${idx} and allow_buy = 'n'

                        // union

                        // select company_name, get_sell_stock as stock , '매도 준비 중' as memo ,
                        // (select count(*) from stock_sell_item s2 where s2.company_idx = s.company_idx and s2.get_sell_stock = s.get_sell_stock group by get_sell_stock) as cnt
                        // from stock_sell_item s
                        // inner join company_info c on s.company_idx = c.company_idx
                        // where s.user_idx = ${idx} and allow_sell = 'n';` + //진행중인 거래

                        `select company_name, get_buy_stock as stock , '매수' as memo ,
                        (select count(*) from stock_buy_item b2 where b2.company_idx = b.company_idx and b2.get_buy_stock = b.get_buy_stock group by get_buy_stock) as cnt
                        from stock_buy_item b
                        inner join company_info_kospi c on b.company_idx = c.company_idx
                        where b.user_idx = ${idx}

                        union

                        select company_name, get_sell_stock as stock , '매도' as memo ,
                        (select count(*) from stock_sell_item s2 where s2.company_idx = s.company_idx and s2.get_sell_stock = s.get_sell_stock group by get_sell_stock) as cnt
                        from stock_sell_item s
                        inner join company_info_kospi c on s.company_idx = c.company_idx
                        where s.user_idx = ${idx};` + //거래 내역

                        `select company_name from interest_item i
                        inner join company_info_kospi c on i.company_idx = c.company_idx
                        where i.user_idx = ${idx}`; // 관심 종목

            dbconn.query(query, (err,result,fields) =>
                {
                    if(err){
                        reject(err);
                    } else {
                        let res = JSON.parse(JSON.stringify(result));
                        resolve(res);
                    }
            });
        })
    },
    changeNickname : function(idx,nickname) {
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
    },
    //assets
    getAssetsInfo : function(idx) {
        //(uint_price - current_price) as profit , (profit*100) as profit_percentage
        console.log(idx);
        //total_buy_price : 총 매입액
        //total_evaluation : 총 평가액
        //realProfit : 실현 수익
        //evaluation_profit : 평가 손익
        return new Promise ((resolve, reject) => {
            var query = `select company_name ,
                        sum(sum(get_buy_price) * sum(get_buy_stock)) as total_buy_price ,
                        sum(sum(get_buy_price) * sum(get_buy_stock) - (company_stock) * sum(get_buy_stock)) as total_evaluation,
                        sum(sum(get_buy_price) * sum(get_buy_stock) - (sum(get_sell_price) * sum(get_sell_stock)) as realProfit
                        sum((company_stock) * sum(get_buy_stock)) as evaluation_profit,
                        from company_info c
                        left join stock_buy_item b on c.company_idx = b.company_idx
                        left join stock_sell_item s on c.company_idx = s.company_idx
                        where b.user_idx = ${idx}
                        group by user_idx;`+

                        `select count(*) as cnt , sum(get_buy_stock) as unit_price , sum(company_stock) as current_price , company_name
                        from stock_buy_item b
                        inner join company_info c on b.company_idx = c.company_idx
                        where b.user_idx = ${idx};`; //종목 별 수익률 등등

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
    }
}
