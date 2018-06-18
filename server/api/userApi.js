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

router.get('/getCustomerConsume', (req, res) => {
	var sql = $sql.user.getCustomerConsumeByYear;
	var customerId = req.query.customer_id;
	var year = req.query.year;
	conn.query(sql, [customerId, year], (err, result) =>{
		if(err) {
			console.log(err);
		}
		if(result) {
			let data = {
				year: year,
				data: []
			}
			for(let i = 1; i <= 12; i++) {
				let flag = false;
				result.forEach(value => {
					if(value.month == (i)) {
						data.data.push(value.total_sale_amount);
						flag = true;
					}
				})
				if(flag == false) {
					data.data.push(0);
				}
			}
			res.send(data);
		}	
	})
})

router.post('/checkManager', (req, res) => {
	var params = req.body;
	conn.query($sql.user.checkManager, [params.username, params.password], (err, result) => {
		if(err) {
			console.log(err);
		}
		if(result.length == 1) {
			res.send('success!');
		} else {
			res.send('Refuse!');
		}
	})
})

router.post('/addUser', (req, res) => {
	var params = req.body;
	conn.query("select * from member where login_user = ?", [params.username], (err, result) => {
		if(err) {
			console.log(err);
		}
		if(result.length == 1) {
			res.send('Refuse!');
		} else {
			conn.query($sql.user.addUser, [params.username, params.password], (err, result) => {
				if(err) {
					console.log(err);
				}
				if(result) {
					conn.query('insert into customer_habit values(?, 0, 0, 0, 0, 0, 0, 0, 0)', [params.username], (err, result) => {
						if (err) {
							console.log(err);
						}
						res.send("success!");
					})				
				}
			})
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