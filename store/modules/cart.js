import Vue from 'vue'

const state = {
	shoppingCart: []
}

// getters
const getters = {
	totalPrice: (state, getters, rootState) => {
		var price = 0;
		state.shoppingCart.forEach(value => {
			price += value.amount * getters.getGoodsById(value.goods_id).goods_price * getters.getDiscountById(value.goods_id);
		})
		return price.toFixed(2);

	},
	getCartNumById: (state) => (goods_id) => {
		var result = 0;
		state.shoppingCart.forEach(value => {
			if(value.goods_id == goods_id) {
				result = value.amount;
			}
		})
		return result;
	}
}

// actions
const actions = {
	buyGoods: (context) => {
		new Vue().$axios.post('/api/goods/buyGoods', {
			shoppingCart: context.state.shoppingCart,
			member_user: new Vue().$cookieStore.getCookie('username'),
			totalPrice: context.rootGetters.totalPrice
		}).then(
			res => {
				context.commit('clearCart');
			}
		)
	},
	addOneItem: (context, goods_id) => {
		if(context.rootGetters.getGoodsStockById(goods_id) >= context.rootGetters.getCartNumById(goods_id) + 1) {
			context.commit('addOneItem', goods_id);
			new Vue().$message({
				message: '添加购物车成功',
				type: 'success'
			})
		} else {
			new Vue().$message({
				message: '库存不足'
			})
		}
	},
	addItems: (context, record) => {
		var num = record.amount;
		var id = record.goods_id;
		
		if(context.rootGetters.getGoodsStockById(id) >= (context.rootGetters.getCartNumById(id) + num)) {
			context.commit('addItems', record);
			new Vue().$message({
				message: '添加购物车成功',
				type: 'success'
			})
		} else {
			new Vue().$message({
				message: '库存不足'
			})
		}
		
	}
}

// mutations
const mutations = {
	clearCart: (state) => {
		state.shoppingCart = [];
	},
	addOneItem: (state, goods_id) => {
		var id = goods_id;
		var flag = false;
		state.shoppingCart.forEach(value => {
			if(value.goods_id == id) {
				value.amount++;
				flag = true;
			}
		})
		if(flag == false) {
			state.shoppingCart.push({
				'goods_id': id,
				'amount': 1
			})
		}

	},
	addItems: (state, record) => {
		var flag = false;
		var num = record.amount;
		var id = record.goods_id;
		state.shoppingCart.forEach(value => {
			if(value.goods_id == id) {
				value.amount += num;
				flag = true;
			}
		})
		if(flag == false) {
			state.shoppingCart.push({
				'goods_id': id,
				'amount': num
			})
		}
	},
	decreaseOneItem: (state, goods_id) => {
		var flag = false;
		var position;
		state.shoppingCart.forEach((value, index) => {
			if(value.goods_id == goods_id) {
				value.amount--;
				if(value.amount == 0) {
					flag = true;
					position = index;
				}
			}
		})
		if(flag) {
			state.shoppingCart.splice(position, 1);
		}
	},
	removeItem: (state, goods_id) => {
		var position;
		state.shoppingCart.forEach((value, index) => {
			if(value.goods_id == goods_id) {
				position = index;
			}
		})
		state.shoppingCart.splice(position, 1);
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}