// sql语句
var sqlMap = {
	// 用户
	user: {
		add: 'insert into user(id, name, age) values (0, ?, ?)',
		check: 'select * from member where login_user = ? and login_pwd = ?',
		getUserMoney: 'select sum(total_price) as total_money from sale_record where customer_id = ?',
		getUserRecord: 'select * from sale_record where customer_id = ? order by record_time desc',
		getCustomerInfo: 'select * from member where login_user = ?',
		getSimilarUser: 'call get_similar_user(?)',
		confirmRecommend: 'update member set is_first = 0 where login_user = ?',
		getCustomerConsumeByYear: 'select * from customer_sale_month_statistics where customer_id = ? and year = ? order by month',
		checkManager: 'select * from manage where username = ? and password = ?',
		addUser: 'insert into member(login_user, login_pwd, total_money, is_first) values(?, ?, 0, 1)'
	},
	goods: {
		get: 'select * from (goods natural join goods_type natural join stock) natural join goods_rank order by goods_id',
		getALlGoodsDescription: 'select goods_description from goods',
		getById: 'select * from goods natural join goods_type where goods_id = ?',
		buyGoods: 'insert into sale_record(content, record_time, customer_id, total_price) values(?, ?, ?, ?)',
		buyGoods2: 'insert into sale_record2(goods_id, amount, record_time, customer_id) values(?, ?, ?, ?)',
		getDiscount: 'select * from discount where start_time <= ? and end_time >= ?',
		addDiscount: 'insert into discount(goods_id, discount, start_time, end_time) values(?, ?, ?, ?)',
		deleteDiscount: 'delete from discount where discount_id = ?',
		getGoodsRank: 'select * from goods_rank',
		getRelativeGoodsById: 'call get_relative_goods(?)',
		getRecommendImportList: 'call get_recommend_import_goods()'
	},
	goods_type: {
		get: 'select type_id, type_name from goods_type'
	},
	record: {
		get: 'select * from sale_record order by record_time desc',
		getByUser: 'select goods_id, goods_amount, record_time from sale_record where member_user = ?',
		getSaleAmount: 'select goods_id, sum(goods_amount) as amount from sale_record group by goods_id',
		getRecordByGoods: 'select goods_amount, record_time from sale_record where goods_id = ?',
		getRecordByTime: 'select goods_id, goods_amount from sale_record where record_time between ? and ?',
		addRecord: 'insert into sale_record_test(content, record_time, customer_id) values(?, ?, ?)',
		getTestRecord: 'select * from sale_record_test',
		confirmReceive: 'update sale_record set is_received = 1 where record_id = ?',
		getRecord: 'select * from goods_record',
		getYearRecord: 'select * from sale_month_statistics where year = ? order by month',
		getYearRecord2: 'select * from sale_year_statistics where year = ?',
		getMonthSale: 'call get_month_sale(?, ?, ?)',
		getCurrentMonthRecord: 'call get_current_month_sale()'
	},
	comment: {
		getCommentByGoods: 'select * from comment where goods_id = ?',
		getAllComment: 'select * from comment order by time desc',
		addComment: 'insert into comment(content, author, rank, time, goods_id) values(?, ?, ?, ?, ?)'
	},
	emp: {
		getEmp: 'select * from employee'
	},
	customer_habit: {
		getById: 'select * from customer_habit where customer_id = ?',
		init: 'update customer_habit set type1 = ?, type2 = ?, type3 = ?, type4 = ?, type5 = ?, type6 = ?, type7 = ?, type8 = ? where customer_id = ?'
	},
	stock: {
		getStock: 'select * from stock order by remain desc',
		addImportRecord: 'insert into import_record(goods_id, goods_amount, time) values(?, ?, ?)'
	}
}

module.exports = sqlMap;

