var  mysql = require('mysql');

var dbconnInfo = {
  host: '211.192.15.176',
  port: '3306',
  user: 'hannam',
  password: '',
  database: 'hannam', 
  multipleStatements : true
};

  module.exports = {
    init : function(){
        return mysql.createConnection(dbconnInfo);
    },
  }
