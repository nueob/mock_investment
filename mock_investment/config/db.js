var  mysql = require('mysql');

var dbconnInfo = {
  host: 'localhost',
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
