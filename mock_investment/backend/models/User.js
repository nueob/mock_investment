// const mysql = require('mysql');
// const db = require('../config/db');
// const table = 'users';

// module.exports = {
//     getUser : function() {
//         return new Promise ((resolve,reject) => {
//             const con = mysql.createConnection(db);
//             con.query(
//                 `select id from ${table}` , (err,result,fields) =>
//                 {
//                     if(err) {
//                         reject(err);
//                     } else {
//                         resolve(result);
//                     }
//                 });
//             con.end();
//         })
//     }
// }