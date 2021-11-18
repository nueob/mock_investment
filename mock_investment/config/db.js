var  mysql = require('mysql');

var dbconnInfo = {
  host: '219.254.137.107',
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
