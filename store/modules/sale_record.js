import Vue from 'vue'

const state = {
	currentMonthRecord: []
}

// getters
const getters = {
	getMonthRecordById: (state) => (goods_id) => {
		var result = 0;
		state.currentMonthRecord.forEach(value => {
			if(value.goods_id == goods_id) {
				result = value.num;
			}
		})		
		return result;
	}
}

// actions
const actions = {
	loadCurrentMonthRecord: ({state, commit, rootState, rootGetters}) => {
		new Vue().$axios.get('/api/record/getCurrentMonthRecord').then(res => {
			var length = rootState.goods.goodsList.length;
			var result = [];
			for(let i = 1; i <= length; i++) {
				result.push({
					goods_id: i,
					goods_name: rootGetters.getGoodsById(i).goods_name,
					num: 0
				})
			}
			res.data.forEach(value => {
				result.forEach(value2 => {
					if(value.goods_id == value2.goods_id) {
						value2.num = value.num;
					}
				})
			})
			for(let i = 0; i < length - 1; i++) {
				for(let j = i; j < length; j++) {
					if(result[i].num < result[j].num) {
						var temp = result[i];
						result[i] = result[j];
						result[j] = temp;
					}
				}
			}
			commit('loadCurrentMonthRecord', result);
		})
	}
}

// mutations
const mutations = {
	loadCurrentMonthRecord: (state, data) => {
		state.currentMonthRecord = data;
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}