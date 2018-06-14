var express = require('express');
var router = express.Router();

var models = require('../db');
var mysql = require('mysql');
var $sql = require('../sqlMap');

// 连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();

router.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


router.get('/getEmp', (req, res) => {
	var sql = $sql.emp.getEmp;
	conn.query(sql, [], (err, result) => {
		if(err) {
			console.log(err);
		}
		if(result) {
			res.send(result);
		}
	})
})




module.exports = router;
