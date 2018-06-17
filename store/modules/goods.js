import Vue from 'vue'

const state = {
	goodsList: [],
	typeNames: [],
	discountList: [],
	recommendDiscountList: [],
	stockList: [],
	recommendGoodsList: []
}

// getters
const getters = {
	getGoodsById: (state) => (id) => {
		return state.goodsList.find(goods => goods.goods_id == id);
	},
	getGoodsByName: (state) => (name) => {
		var result;
		state.goodsList.forEach(value => {
			if(value.goods_name == name) {
				result = value;
			}
		})
		return result;
	},
	getUnDiscountGoodsNameList: (state) => {
		var result = [];
		state.goodsList.forEach(value => {
			var flag = false;
			state.discountList.forEach(value2 => {
				if(value2.goods_id == value.goods_id) {
					flag = true;
				}
			})
			state.recommendDiscountList.forEach(value3 => {
				if(value3.goods_id == value.goods_id) {
					flag = true;
				}
			})
			if(flag == false) {
				result.push({
					value: value.goods_name
				})
			}
		})
		return result;
	},
	isDiscount: (state) => (goods_id) => {
		var flag = false;
		state.discountList.forEach(value => {
			if(value.goods_id == goods_id) {
				flag = true;
			}
		})
		return flag;
	},
	getDiscountById: (state) => (goods_id) => {
		var discount = 1;
		state.discountList.forEach(value => {
			if(value.goods_id == goods_id) {
				discount = value.discount;
			}
		})
		return discount;
	},
	getGoodsNameList: (state) => {
		var result = [];
		state.goodsList.forEach(value => {
			result.push({
				value: value.goods_name
			});
		})
		return result;
	},
	getGoodsStockById: (state) => (goods_id) => {
		var result;
		state.stockList.forEach(value => {
			if(value.goods_id == goods_id) {
				result = value.remain;
			}
		})
		return result;
	}
}

// actions
const actions = {
	loadGoods: (context) => {
		new Vue().$axios.get('/api/goods/getGoods').then(res => {
			context.commit('loadGoods', res.data);
		})
	},
	loadTypeNames: (context) => {
		new Vue().$axios.get('/api/goods/getGoodsType').then(res => {
			context.commit('loadTypeNames', res.data);
		})
	},
	loadDiscountList: (context) => {
		new Vue().$axios.get('/api/goods/getDiscount').then(res => {
			context.commit('loadDiscountList', res.data);
		})
	},
	loadRecommendDiscountList: (context) => {
		new Vue().$axios.get('/api/goods/getRecommendDiscountList').then(res => {
			context.commit('loadRecommendDiscountList', res.data);
		})
	},
	loadStockList: (context) => {
		new Vue().$axios.get('/api/goods/getStock').then(res => {
			context.commit('loadStockList', res.data);
		})
	},
	loadRecommendGoodsList: (context) => {
		new Vue().$axios.get('/api/customer/getSimilarUser', {
			params: {
				customer_id: new Vue().$cookieStore.getCookie('username')
			}
		}).then(res => {
			var result = [];
			res.data.forEach(value => {
				result.push(context.rootGetters.getGoodsById(value))
			})
			context.commit('loadRecommendGoodsList', result);
		})
	}
}

// mutations
const mutations = {
	loadGoods: (state, goodsList) => {
		state.goodsList = goodsList;
	},
	loadTypeNames: (state, typeNames) => {
		state.typeNames = typeNames;
	},
	loadDiscountList: (state, data) => {
		state.discountList = data;
	},
	loadRecommendDiscountList: (state, data) => {
		state.recommendDiscountList = data;
	},
	loadStockList: (state, data) => {
		state.stockList = data;
	},
	loadRecommendGoodsList: (state, data) => {
		state.recommendGoodsList = data;
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}