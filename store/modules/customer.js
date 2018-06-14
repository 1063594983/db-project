import Vue from 'vue'

const state = {
	customerHabit: [],
	customerInfo: [],
	customerRecord: [],
	customerConsume: []
}

// getters
const getters = {
	getCustomerConsumeByYear: (state) => (year) => {
		var result;
		state.customerConsume.forEach(value => {
			if(value.year == year) {
				result = value.data;
			}
		})
		return result;
	}
}

// actions
const actions = {
	loadCustomerHabit: (context) => {
		new Vue().$axios.get('/api/customer/getHabitById', {
			params: {
				customer_id: new Vue().$cookieStore.getCookie('username')
			}
		}).then(res => {
			context.commit('loadCustomerHabit', res.data);
		})
	},
	loadCustomerInfo: (context) => {
		new Vue().$axios.get('/api/customer/getCustomerInfo', {
			params: {
				customer_id: new Vue().$cookieStore.getCookie('username')
			}
		}).then(res => {
			context.commit('loadCustomerInfo', res.data);
		})
	},
	loadCustomerRecord: (context) => {
		new Vue().$axios.get('/api/user/getUserRecord', {
			params: {
				customer_id: new Vue().$cookieStore.getCookie('username')
			}}).then(res => {
				var result = [];
				res.data.forEach(value => {
					result.push({
						record_id: value.record_id,
						record_time: value.record_time,
						goods: JSON.parse(value.content),
						total_price: value.total_price,
						is_received: value.is_received,
						is_commented: value.is_commented
					})
				})
				context.commit('loadCustomerRecord', result);
			}
		)
	},
	loadCustomerConsume: (context, option) => {
		new Vue().$axios.get('/api/user/getCustomerConsume', {
			params: {
				customer_id: new Vue().$cookieStore.getCookie('username'),
				year: option.year
			}
		}).then(res => {
			context.commit("loadCustomerConsume", res.data);
		})
	}
}

// mutations
const mutations = {
	loadCustomerHabit: (state, customerHabit) => {
		state.customerHabit = customerHabit;
	},
	loadCustomerInfo: (state, data) => {
		state.customerInfo = data;
	},
	loadCustomerRecord: (state, data) => {
		state.customerRecord = data;
	},
	loadCustomerConsume: (state, data) => {
		var flag = false;
		state.customerConsume.forEach(value => {
			if(value.year == data.year) {
				value.data = data.data;
				flag = true;
			}
		})
		if(flag == false) {
			state.customerConsume.push(data);
		}
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}