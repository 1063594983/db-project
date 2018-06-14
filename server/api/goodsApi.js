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

router.get('/getGoods', (req, res) => {
	conn.query($sql.goods.get, [], (err, result) => {
		if(err) {
			console.log(err);
		}
		if(result) {
			res.cookie('goodsList', result);
			res.send(result);
		}
	})
})

router.get('/getGoods/:id', (req, res) => {
	conn.query($sql.goods.getById, [req.params.id], (err, result) => {
		if(err) {
			console.log(err);
		}
		if(result) {
			res.send(result)

		}
	})
})

router.get('/getGoodsType', (req, res) => {
	conn.query($sql.goods_type.get, [], (err, result) => {
		if(err) {
			console.log(err);
		}
		if(result) {
			res.send(result);
		}
	})
})

router.post('/buyGoods', (req, res) => {
	var params = req.body;
	var sql = $sql.goods.buyGoods;
	var sql2 = $sql.goods.buyGoods2;
	var current_time = new Date().getTime();
	var member_user = params.member_user;
	var totalPrice = params.totalPrice;
	conn.query(sql, [JSON.stringify(params.shoppingCart), current_time, member_user, totalPrice], (err, result) => {
		if(err) {
			console.log(err);
		}
	})
	params.shoppingCart.forEach(value => {
		conn.query(sql2, [value.goods_id, value.amount, current_time, member_user], (err, result) => {
			if(err) {
				console.log(err);
			}
		})
	})
	res.end();

})

router.get('/getRecords', (req, res) => {
	var sql = $sql.record.get;
	conn.query(sql, [], (err, result) => {
		if(err) {
			console.log(err);
		}
		if(result) {
			res.send(result);
		}
	})
})

router.get('/getRecordsByUser', (req, res) => {
	var sql = $sql.record.getByUser;
	var user = req.query.user;
	conn.query(sql, [user], (err, result) => {
		if(err) {
			console.log(err);
		}
		if(result) {
			res.send(result);
		}
	})
})

router.get('/getSaleAmount', (req, res) => {
	var sql = $sql.record.getSaleAmount;
	conn.query(sql, [], (err, result) => {
		if(err) {
			console.log(err);
		}
		if(result) {
			res.send(result);
		}
	})
})

router.get('/getRecordByGoods', (req, res) => {
	var params = req.query;
	var sql = $sql.record.getRecordByGoods;
	conn.query(sql, [params.goods_id], (err, result) => {
		if(err) {
			console.log(err);
		}
		if(result) {
			res.send(result);
		}
	})
})

router.get('/getYearRecord', (req, res) => {
	var year = req.query.year;
	var sql = $sql.record.getRecordByTime;
	var startTime = new Date(year + '').getTime();
	var endTime = new Date((year + 1) + '').getTime();
	conn.query(sql, [startTime, endTime], (err, result) => {
		if(err) {
			console.log(err);
		}
		if(result) {
			res.send(result);
		}
	})
})

router.get('/getMonthRecord', (req, res) => {
	var params = req.query;
	var sql = $sql.record.getRecordByTime;
	var startTime = params.startTime;
	var endTime = params.endTime;
	conn.query(sql, [startTime, endTime], (err, result) => {
		if(err) {
			console.log(err);
		}
		if(result) {
			res.send(result);
		}
	})
})

router.get('/getDayRecord', (req, res) => {
	var date = req.query.date;
	var sql = $sql.record.getRecordByTime;
	var startTime = new Date(date).getTime();
	var endTime = startTime + 86400000;
	conn.query(sql, [startTime, endTime], (err, result) => {
		if(err) {
			console.log(err);
		}
		if(result) {
			res.send(result);
		}
	})
})

router.post('/confirmReceive', (req, res) => {
	var params = req.body;
	var sql = 'update sale_record set is_received = 1 where record_id = ?';
	var recordId = params.recordId;
	conn.query(sql, [recordId], (err, result) => {
		if(err) {
			console.log(err);
		}
		if(result) {
			res.end();
		}
	})
})

router.get('/getRecord', (req, res) => {
	var sql = $sql.record.getRecord;
	conn.query(sql, [], (err, result) => {
		if(err) {
			console.log(err);
		}
		if(result) {
			res.send(result);
		}
	})
})

const goodsList = [{
	"goods_id": 1,
	"type_id": 1,
	"goods_name": "越南白心火龙果（1个）",
	"goods_description": "越南白心火龙果（1个）",
	"goods_price": 7.9,
	"goods_image": "[{\"src\": \"/static/images/fruits/dragon_fruit1.jpg\"}, {\"src\": \"/static/images/fruits/dragon_fruit2.jpg\"}]",
	"goods_source": "越南",
	"type_name": "生鲜水果",
	"remain": 108
}, {
	"goods_id": 2,
	"type_id": 1,
	"goods_name": "山东红富士苹果（3个）",
	"goods_description": "山东红富士苹果（3个）",
	"goods_price": 6.9,
	"goods_image": "[{\"src\": \"/static/images/fruits/apple1.jpg\"}]",
	"goods_source": "山东",
	"type_name": "生鲜水果",
	"remain": 180
}, {
	"goods_id": 3,
	"type_id": 2,
	"goods_name": "新西兰低脂牛奶（250ml x 24盒）",
	"goods_description": "新西兰低脂牛奶（250ml x 24盒）",
	"goods_price": 72,
	"goods_image": "[{\"src\": \"/static/images/food/milk1.jpg\"}]",
	"goods_source": "新西兰",
	"type_name": "进口食品",
	"remain": 980
}, {
	"goods_id": 4,
	"type_id": 3,
	"goods_name": "三只松鼠开心果（225g x 1袋）",
	"goods_description": "三只松鼠开心果（225g x 1袋）",
	"goods_price": 28.9,
	"goods_image": "[{\"src\": \"/static/images/food/pistachio1.jpg\"}]",
	"goods_source": "上海",
	"type_name": "休闲零食",
	"remain": 820
}, {
	"goods_id": 5,
	"type_id": 1,
	"goods_name": "新疆库尔勒香梨(1kg)",
	"goods_description": "新疆库尔勒香梨(1kg)",
	"goods_price": 15.8,
	"goods_image": "[{\"src\": \"/static/images/fruits/pear1.jpg\"}]",
	"goods_source": "新疆",
	"type_name": "生鲜水果",
	"remain": 240
}, {
	"goods_id": 6,
	"type_id": 1,
	"goods_name": "四川安岳黄柠檬（4个）",
	"goods_description": "四川安岳黄柠檬（4个）",
	"goods_price": 5.5,
	"goods_image": "[{\"src\": \"/static/images/fruits/lemon1.jpg\"}]",
	"goods_source": "四川",
	"type_name": "生鲜水果",
	"remain": 210
}, {
	"goods_id": 7,
	"type_id": 1,
	"goods_name": "海南小台农芒果（1kg）",
	"goods_description": "海南小台农芒果（1kg）",
	"goods_price": 9.9,
	"goods_image": "[{\"src\": \"/static/images/fruits/mango1.jpg\"}]",
	"goods_source": "海南",
	"type_name": "生鲜水果",
	"remain": 20
}, {
	"goods_id": 8,
	"type_id": 1,
	"goods_name": "进口凤梨（1个）",
	"goods_description": "进口凤梨（1个）",
	"goods_price": 19.9,
	"goods_image": "[{\"src\": \"/static/images/fruits/pineapple1.jpg\"}]",
	"goods_source": "菲律宾",
	"type_name": "生鲜水果",
	"remain": 50
}, {
	"goods_id": 9,
	"type_id": 1,
	"goods_name": "常瀛进口香蕉（5根）",
	"goods_description": "常瀛进口香蕉（5根）",
	"goods_price": 12.9,
	"goods_image": "[{\"src\": \"/static/images/fruits/banana1.jpg\"}]",
	"goods_source": "常瀛",
	"type_name": "生鲜水果",
	"remain": 600
}, {
	"goods_id": 10,
	"type_id": 2,
	"goods_name": "巧克力威化饼干（600g x 1盒）",
	"goods_description": "巧克力威化饼干（600g x 1盒）",
	"goods_price": 79,
	"goods_image": "[{\"src\": \"/static/images/food/biscuit1.jpg\"}]",
	"goods_source": "德国",
	"type_name": "进口食品",
	"remain": 710
}, {
	"goods_id": 11,
	"type_id": 3,
	"goods_name": "喜之郎果冻果肉（990g x 1袋）",
	"goods_description": "喜之郎果冻果肉（990g x 1袋）",
	"goods_price": 32.9,
	"goods_image": "[{\"src\": \"/static/images/food/jelly1.jpg\"}]",
	"goods_source": "上海",
	"type_name": "休闲零食",
	"remain": 910
}, {
	"goods_id": 12,
	"type_id": 3,
	"goods_name": "百草味多味花生",
	"goods_description": "百草味多味花生",
	"goods_price": 19.8,
	"goods_image": "[{\"src\": \"/static/images/food/peanut1.jpg\"}]",
	"goods_source": "上海",
	"type_name": "休闲零食",
	"remain": 930
}, {
	"goods_id": 13,
	"type_id": 1,
	"goods_name": "西班牙脐橙（10个）",
	"goods_description": "西班牙脐橙（10个）",
	"goods_price": 28.8,
	"goods_image": "[{\"src\": \"/static/images/fruits/naval_orange1.jpg\"}]",
	"goods_source": "西班牙",
	"type_name": "生鲜水果",
	"remain": 340
}, {
	"goods_id": 14,
	"type_id": 1,
	"goods_name": "甜岛宝台湾葡萄柚（2个）",
	"goods_description": "甜岛宝台湾葡萄柚（2个）",
	"goods_price": 12.8,
	"goods_image": "[{\"src\": \"/static/images/fruits/shaddock1.jpg\"}]",
	"goods_source": "台湾",
	"type_name": "生鲜水果",
	"remain": 700
}, {
	"goods_id": 15,
	"type_id": 1,
	"goods_name": "冰鲜精肋排块（450g）",
	"goods_description": "冰鲜精肋排块（450g）",
	"goods_price": 30.8,
	"goods_image": "[{\"src\": \"/static/images/meat/pork1.jpg\"}]",
	"goods_source": "上海",
	"type_name": "生鲜水果",
	"remain": 250
}, {
	"goods_id": 16,
	"type_id": 4,
	"goods_name": "五粮液股份精品（500ml x 6瓶）",
	"goods_description": "五粮液股份精品（500ml x 6瓶）",
	"goods_price": 169,
	"goods_image": "[{\"src\": \"/static/images/drink/spirit1.jpg\"}]",
	"goods_source": "上海",
	"type_name": "酒水乳饮",
	"remain": 650
}, {
	"goods_id": 17,
	"type_id": 4,
	"goods_name": "洛神赤霞珠整箱（750ml x 6瓶）",
	"goods_description": "洛神赤霞珠整箱（750ml x 6瓶）",
	"goods_price": 228,
	"goods_image": "[{\"src\": \"/static/images/drink/wine1.jpg\"}]",
	"goods_source": "上海",
	"type_name": "酒水乳饮",
	"remain": 810
}, {
	"goods_id": 18,
	"type_id": 4,
	"goods_name": "百威小麦醇正啤酒（500ml x 18听）",
	"goods_description": "百威小麦醇正啤酒（500ml x 18听）",
	"goods_price": 104,
	"goods_image": "[{\"src\": \"/static/images/drink/beer1.jpg\"}]",
	"goods_source": "上海",
	"type_name": "酒水乳饮",
	"remain": 150
}, {
	"goods_id": 19,
	"type_id": 4,
	"goods_name": "正宗椰树牌椰汁（245ml x 24盒）",
	"goods_description": "正宗椰树牌椰汁（245ml x 24盒）",
	"goods_price": 91.2,
	"goods_image": "[{\"src\": \"/static/images/drink/coconut_juice1.jpg\"}]",
	"goods_source": "上海",
	"type_name": "酒水乳饮",
	"remain": 660
}, {
	"goods_id": 20,
	"type_id": 4,
	"goods_name": "脉动青柠味饮料（600ml x 15瓶）",
	"goods_description": "脉动青柠味饮料（600ml x 15瓶）",
	"goods_price": 49.9,
	"goods_image": "[{\"src\": \"/static/images/drink/mai_dong1.jpg\"}]",
	"goods_source": "上海",
	"type_name": "酒水乳饮",
	"remain": 130
}, {
	"goods_id": 21,
	"type_id": 5,
	"goods_name": "十月稻田稻花香（5kg x 1袋）",
	"goods_description": "十月稻田稻花香（5kg x 1袋）",
	"goods_price": 55,
	"goods_image": "[{\"src\": \"/static/images/type5/rice1.jpg\"}]",
	"goods_source": "黑龙江",
	"type_name": "粮油副食",
	"remain": 200
}, {
	"goods_id": 22,
	"type_id": 5,
	"goods_name": "金龙鱼非转大豆油（5L x 1桶）",
	"goods_description": "金龙鱼非转大豆油（5L x 1桶）",
	"goods_price": 59.8,
	"goods_image": "[{\"src\": \"/static/images/type5/oil1.jpg\"}]",
	"goods_source": "上海",
	"type_name": "粮油副食",
	"remain": 200
}, {
	"goods_id": 23,
	"type_id": 6,
	"goods_name": "云南白药牙膏（210g x 1支）",
	"goods_description": "云南白药牙膏（210g x 1支）",
	"goods_price": 33,
	"goods_image": "[{\"src\": \"/static/images/type6/toothpaste1.jpg\"}]",
	"goods_source": "上海",
	"type_name": "美妆个护",
	"remain": 200
}, {
	"goods_id": 24,
	"type_id": 6,
	"goods_name": "海飞丝清爽洗发水（750ml x 1瓶）",
	"goods_description": "海飞丝清爽洗发水（750ml x 1瓶）",
	"goods_price": 55.8,
	"goods_image": "[{\"src\": \"/static/images/type6/shampoo1.jpg\"}]",
	"goods_source": "上海",
	"type_name": "美妆个护",
	"remain": 195
}, {
	"goods_id": 25,
	"type_id": 7,
	"goods_name": "天堂伞格子大伞",
	"goods_description": "天堂伞格子大伞",
	"goods_price": 19.9,
	"goods_image": "[{\"src\": \"/static/images/type7/umbrella1.jpg\"}]",
	"goods_source": "上海",
	"type_name": "家居用品",
	"remain": 200
}, {
	"goods_id": 26,
	"type_id": 7,
	"goods_name": "妙洁纸杯100只（100只 x 1包）",
	"goods_description": "妙洁纸杯100只（100只 x 1包）",
	"goods_price": 13.9,
	"goods_image": "[{\"src\": \"/static/images/type7/sanitary_cup1.jpg\"}]",
	"goods_source": "上海",
	"type_name": "家居用品",
	"remain": 200
}, {
	"goods_id": 27,
	"type_id": 8,
	"goods_name": "雕牌冷水洗洁精（1.5kg x 2瓶）",
	"goods_description": "雕牌冷水洗洁精（1.5kg x 2瓶）",
	"goods_price": 22.5,
	"goods_image": "[{\"src\": \"/static/images/type8/cleanser_essence1.jpg\"}]",
	"goods_source": "上海",
	"type_name": "家庭清洁",
	"remain": 200
}, {
	"goods_id": 28,
	"type_id": 8,
	"goods_name": "心相印婴儿抽纸（120抽 x 18包）",
	"goods_description": "心相印婴儿抽纸（120抽 x 18包）",
	"goods_price": 72.9,
	"goods_image": "[{\"src\": \"/static/images/type8/tissue1.jpg\"}]",
	"goods_source": "上海",
	"type_name": "家庭清洁",
	"remain": 200
}]

function getPrice(goods_id) {
	var result;
	goodsList.forEach(value => {
		if(value.goods_id == goods_id) {
			result = value.goods_price;
		}
	})
	return result;
}

function getTypeId(goods_id) {
	var result;
	goodsList.forEach(value => {
		if(value.goods_id == goods_id) {
			result = value.type_id;
		}
	})
	return result;
}

/*
 *生成销售记录数据 
 */

router.get('/generateData', (req, res) => {
	var sql = $sql.goods.buyGoods;
	var sql2 = $sql.goods.buyGoods2;
	var times, shoppingCart, goodsId, amount;
	var time, customer_id, totalPrice;
	for(let i = 0; i < 500; i++) {
		times = Math.floor(Math.random() * 4) + 1;
		time = Math.floor(Math.random() * (new Date().getTime() - new Date(2010, 0, 1).getTime())) + new Date(2010, 0, 1).getTime();
		shoppingCart = [];
		totalPrice = 0;
		for(let j = 0; j < times; j++) {
			goodsId = Math.floor(Math.random(i) * 27) + 1;
			amount = Math.floor(Math.random() * 9) + 1;
			shoppingCart.push({
				"goods_id": goodsId + '',
				"amount": amount
			})
		}
		shoppingCart.forEach(value => {
			totalPrice += getPrice(value.goods_id) * value.amount;
		})
		customer_id = Math.floor(Math.random() * 98) + 1;

		conn.query(sql, [JSON.stringify(shoppingCart), time, customer_id, totalPrice], (err, result) => {
			if(err) {
				console.log(err);
			}
		})
		shoppingCart.forEach(value => {
			conn.query(sql2, [value.goods_id, value.amount, time, customer_id], (err, result) => {
				if(err) {
					console.log(err);
				}
			})
		})
		res.end();

	}

})

router.get('/getDiscount', (req, res) => {
	var sql = $sql.goods.getDiscount;
	conn.query(sql, [new Date().getTime(), new Date().getTime()], (err, result) => {
		if(err) {
			console.log(err);
		}
		if(result) {
			res.send(result);
		}
	})
})

router.get('/getRecommendDiscountList', (req, res) => {
	var sql = $sql.goods.getDiscount;
	conn.query(sql, [], (err, result) => {
		if(err) {
			console.log(err);
		}
		if(result) {
			res.send(result);
		}
	})
})

router.post('/addDiscount', (req, res) => {
	var sql = $sql.goods.addDiscount;
	var discountList = req.body.discount_list;
	discountList.forEach(value => {
		var startTime = new Date(value.start_time).getTime();
		var endTime = new Date(value.end_time).getTime();
		conn.query(sql, [value.goods_id, value.discount, startTime, endTime], (err, result) => {
			if(err) {

			}
		})
	})
	res.end();
})

router.post('/deleteDiscount', (req, res) => {
	var sql = $sql.goods.deleteDiscount;
	var discount_id = req.body.discount_id;
	conn.query(sql, [discount_id], (err, result) => {
		if(err) {
			console.log(err);
		}
		if(result) {
			res.end();
		}
	})
})

router.get('/getStock', (req, res) => {
	var sql = $sql.stock.getStock;
	conn.query(sql, [], (err, result) => {
		if(err) {
			console.log(err);
		}
		if(result) {
			res.send(result);
		}
	})
})

/*
 * 生成库存数据
router.get('/generateData', (req, res) => {
	var sql = "insert into stock values(?, ?)";
	var goods_id, goods_amount;
	for(let goods_id = 1; goods_id <= 20; goods_id++) {
		goods_amount = Math.floor(Math.random() * 100) * 10;
		conn.query(sql, [goods_id, goods_amount], (err, result) => {
			if(err) {
				console.log(err);
			}
		})
	}
	res.end();

})
*/

/*
 * 生成用户数据
 * */

/*
router.get('/generateData', (req, res) => {
	var sql = "insert into member(login_user, login_pwd) values(?, ?)";
	var user, pwd = '123';
	for(let user = 1; user <= 100; user++) {
		conn.query(sql, [user, pwd], (err, result) => {
			if(err) {
				console.log(err);
			}
		})
	}
	res.end();

})
*/

/*
 * 生成评论数据
router.get('/generateData', (req, res) => {
	var sql = "insert into comment(content, author, rank, time, goods_id) values(?, ?, ?, ?, ?)";
	var content, author, rank, time, goods_id;
	for(let i = 0; i < 1000; i++) {
		content = "评论" + i;
		author = Math.floor(Math.random() * 98) + 1;
		rank = Math.floor(Math.random() * 4) + 1;
		time = Math.floor(Math.random() * (new Date().getTime() - new Date(2010, 0, 1).getTime())) + new Date(2010, 0, 1).getTime();
		goods_id = Math.floor(Math.random() * 19) + 1;
		conn.query(sql, [content, author, rank, time, goods_id], (err, result) => {
			if(err) {
				console.log(err);
			}
		})
	}
	res.end();

})
*/

/*
 * 生成用户习惯数据
 * */
/*
router.get('/generateData', (req, res) => {
	var sql = "insert into customer_habit(customer_id, type1, type2, type3, type4, type5, type6, type7, type8) values(?, ?, ?, ?, ?, ?, ?, ?, ?)";
	var customer_id;
	var type = new Array();
	for(let i = 1; i <= 100; i++) {
		customer_id = i;
		for(let j = 0; j < 8; j++) {
			type[j] = Math.floor(Math.random() * 19) + 1;
		}
		conn.query(sql, [customer_id, 0, 0, 0, 0, 0, 0, 0, 0], (err, result) => {
			if(err) {
				console.log(err);
			}
		})
	}
	res.end();

})
*/

/*
 * 生成进货订单数据
router.get('/generateData', (req, res) => {
	var sql = "insert into import_record(goods_id, goods_amount, time) values(?, ?, ?)";
	var goods_id, goods_amount, time;
	for(let i = 1; i <= 1000; i++) {
		goods_id = Math.floor(Math.random() * 19) + 1;
		goods_amount = Math.floor(Math.random() * 99 + 1) * 10;
		time = Math.floor(Math.random() * (new Date().getTime() - new Date(2010, 0, 1).getTime())) + new Date(2010, 0, 1).getTime();
		conn.query(sql, [goods_id, goods_amount, time], (err, result) => {
			if(err) {
				console.log(err);
			}
		})
	}
	res.end();

})
*/

/*
router.get('/buyGoods', (req, res) => {
	var t1 = new Date().getTime();
	res.send(t1.toString());
})
*/

module.exports = router;