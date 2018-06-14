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

const type = ['所有商品', '生鲜水果', '进口食品', '休闲零食' ,'酒水乳饮', '粮油副食', '美妆个护', '家居用品', '家庭清洁'];

router.get('/getYearRecord', (req, res) => {
	var year = req.query.year;
	var sql = $sql.record.getYearRecord;
	conn.query(sql, [year], (err, result) => {
		if(err) {
			console.log(err);
		}
		if(result) {
			var data = {};
			data.year = year;
			data.data = [];
			for(let i = 0; i <= 8; i++) {
				var temp = {};
				temp.name = type[i];
				temp.type = 'line';
				temp.data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
				result.forEach(value => {
					if(value.type_id == i) {
						temp.data[value.month - 1] = value.total_sale_amount;
					}
				})
				data.data.push(temp);
			}
			res.send(data);
		}
	})
})


router.get('/getYearRecord2', (req, res) => {
	var year = req.query.year;
	var sql = $sql.record.getYearRecord2;
	conn.query(sql, [year], (err, result) => {
		if(err) {
			console.log(err);
		}
		if(result) {
			var data = {};
			data.year = year;
			data.data = [];
			for(let i = 1; i <= 8; i++) {
				var temp = {};
				temp.name = type[i];
				temp.value = 0;
				result.forEach(value => {
					if(value.type == i) {
						temp.value = value.amount.toFixed(2);
					}
				})
				data.data.push(temp);
			}
			res.send(data);
		}
	})
})

router.get('/getMonthSale', (req, res) => {
	var year = new Date().getFullYear();
	var month = new Date().getMonth();
	var goodsId = req.query.goods_id;
	var sql = $sql.record.getMonthSale;
	conn.query(sql, [goodsId, year, month], (err, result) => {
		if(err) {
			console.log(err);
		}
		if(result) {
			if(result[0][0]) {
				res.send(result[0][0])
			} else {
				res.send({
					num: 0
				})
			}
		}
	})
})

router.get('/getCurrentMonthRecord', (req, res) => {
	var sql = $sql.record.getCurrentMonthRecord;
	conn.query(sql, [], (err, result) => {
		if(err) {
			console.log(err);
		}
		if(result) {
			res.send(result[0])
		}
	})
})




module.exports = router;
