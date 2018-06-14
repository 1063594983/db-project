import Vue from 'vue'
import VueX from 'vuex'
import VuexPersistence from 'vuex-persist'

import cart from './modules/cart'
import goods from './modules/goods'
import comment from './modules/comment'
import saleRecord from './modules/sale_record'
import chartData from './modules/chart_data'
import customer from './modules/customer'


const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})


Vue.use(VueX)
export default new VueX.Store({
	modules: {
		cart: cart,
		goods: goods,
		comment: comment,
		saleRecord: saleRecord,
		chartData: chartData,
		customer: customer
	},
	state: {

	},
	getters: {
		goodsName(state) {
			var names = [];
			state.goodsList.forEach(value => {
				names.push(value.goods_name);
			})
			return names;
		},
		goodsAmountList(state) {
			var amounts = [];
			state.saleRecord.forEach(value => {
				amounts.push(value.sale_amount);
			})
			return amounts;
		},
		yearRecord(state) {
			var temp = [];
			state.saleRecord.forEach(value => {
				if(value.record_time >= new Date(2018) && value.record_time < new Date(2019)) {
					temp.push(value);
				}
			})
			return temp;
		}
	},
	mutations: {
		loadGoodsType(state, goodsTypes) {
			state.goodsType = goodsTypes;
		}
	},
	actions: {
		
	},
	plugins: [vuexLocal.plugin]
})
