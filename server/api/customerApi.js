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

router.get('/getHabitById', (req, res) => {
	var sql = $sql.customer_habit.getById;
	var id = req.query.customer_id;
	var temp = [];
	conn.query(sql, [id], (err, result) => {
		if(err) {
			console.log(err);
		}
		if(result) {
			for(let i = 1; i <= 8; i++) {
				temp.push(result[0]['type' + i]);
			}
			res.send(temp);
			res.end();
		}
	})
})

router.get('/getCustomerInfo', (req, res) => {
	var customer_id = req.query.customer_id;
	var sql = $sql.user.getCustomerInfo;
	conn.query(sql, [customer_id], (err, result) => {
		if(err) {
			console.log(err);
		}
		if(result) {
			res.send(result)
		}
	})
})

router.get('/getSimilarUser', (req, res) => {
	var customer_id = req.query.customer_id;
	//var sql = $sql.user.getSimilarUser;
	var sql = 'call get_similar_user(?)'
	conn.query(sql, [customer_id], (err, result) => {
		if(err) {
			console.log(err);
		}
		if(result) {
			
			var temp = [];
			result[0].forEach(value => {
				if(temp.indexOf(value.goods_id) == -1) {
					temp.push(value.goods_id);
				}
			})
			var temp2 = [];
			for(let i = 0; i < 4; i++) {
				temp2.push(temp[i]);
			}
			res.send(temp2);
			//res.send(result[0]);
		}
	})
})

router.post('/confirmRecommend', (req, res) => {
	var customer_id = req.body.customer_id;
	var habit = req.body.habit;
	habit.push(customer_id)
	var sql = $sql.user.confirmRecommend;
	var sql2 = $sql.customer_habit.init;
	console.log(customer_id);
	conn.query(sql, [customer_id], (err, result) => {
		if(err) {
			console.log(err);
		}
		if(result) {
			conn.query(sql2, habit, (err, result2) => {
				if(err) {
					console.log(err)
				}
				if(result2) {
					res.end();
				}
			})
		}
	})

})

module.exports = router;