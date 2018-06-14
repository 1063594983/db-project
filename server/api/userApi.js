var express = require('express');
var router = express.Router();

var models = require('../db');
var mysql = require('mysql');
var $sql = require('../sqlMap');

// 连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();

router.all('/', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

router.get('/', (req, res) => {
	res.send('首页');
})

router.get('/getUser', (req, res) => {
	res.send('获取用户信息');
})

router.post('/checkUser', (req, res) => {
	var params = req.body;
	conn.query($sql.user.check, [params.username, params.password], (err, result) => {
		if(err) {
			console.log(err);
		}
		if(result.length == 1) {
			res.cookie("username", params.username);
			res.send('success!');
		} else {
			res.send('Refuse!');
		}
	})
})

router.get('/getUserMoney', (req, res) => {
	var sql = $sql.user.getUserMoney;
	var customerId = req.query.customerId;
	conn.query(sql, [customerId], (err, result) => {
		if(err) {
			console.log(err);
		}
		if(result) {
			res.send(result);
		}
	})
})

router.get('/getUserRecord', (req, res) => {
	var sql = $sql.user.getUserRecord;
	var customerId = req.query.customer_id;
	conn.query(sql, [customerId], (err, result) => {
		if(err) {
			console.log(err);
		}
		if(result) {
			res.send(result);
		}
	})
})


/*
router.post('/', (req,res) => {
	var params = req.body;
	conn.query("select * from user where username = ? and password = ?", [params.username, params.password], (err, result) => {
		if(err) {
			console.log(err);
		}
		if(result) {
			res.send("用户名: " + result[0].username + "密码: " + result[0].password + "年龄: " + result[0].age);
		}
	})
	
})
*/

module.exports = router;