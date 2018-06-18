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


router.get('/getCommentByGoods', (req, res) => {
	var goods_id = req.query.goods_id;
	var sql = $sql.comment.getCommentByGoods;
	conn.query(sql, [goods_id], (err, result) => {
		if(err) {
			console.log(err);
		}
		if(result) {
			res.send(result);
		}
	})
})

router.get('/getAllComment', (req, res) => {
	var sql = $sql.comment.getAllComment;
	conn.query(sql, [], (err, result) => {
		if(err) {
			console.log(err);
		}
		if(result) {
			res.send(result);
		}
	})
})

router.post('/addComment', (req, res) => {
	var sql = $sql.comment.addComment;
	var comments = req.body.comments;
	var time = new Date().getTime();
	comments.forEach(value => {
		conn.query(sql, [value.comment, value.customer_id, value.rank, time, value.goods_id], (err, result) => {
			if(err) {
				console.log(err);
			}

		})
	})
	res.end();
})

router.post('/confirmComment', (req, res) => {
	var params = req.body;
	var sql = 'update sale_record set is_commented = 1 where record_id = ?';
	var recordId = params.record_id;
	conn.query(sql, [recordId], (err, result) => {
		if(err) {
			console.log(err);
		}
		if(result) {
			res.end();
		}
	})
})

module.exports = router;
