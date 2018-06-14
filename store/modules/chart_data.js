import Vue from 'vue'

const state = {
	yearRecord: [],
	yearRecord2: [],
	userYearRecord: []
}

// getters
const getters = {
	getRecordByYear: (state) => (year) => {
		return state.yearRecord.filter(record => record.year == year);
	},
	getRecord2ByYear: (state) => (year) => {
		return state.yearRecord2.filter(record => record.year == year);
	},
	getUserRecordByYear: (state) => (year) => {
		return state.userYearRecord.filter(record => record.year == year);
	}
}

// actions
const actions = {
	loadYearRecord: ({state, commit, rootState, rootGetters}, option) => {
		var year = option.year;
		new Vue().$axios.get('/api/record/getYearRecord', {
			params: {
				year: year
			}
		}).then(res => {
			commit('loadYearRecord', res.data);
		})
	},
	loadYearRecord2: ({state, commit, rootState, rootGetters}, option) => {
		var year = option.year;
		new Vue().$axios.get('/api/record/getYearRecord2', {
			params: {
				year: year
			}
		}).then(res => {
			commit('loadYearRecord2', res.data);
		})
	},
	loadUserYearRecord2: ({state, commit, rootState, rootGetters}, option) => {
		var year = option.year;
		new Vue().$axios.get('/api/record/getUserYearRecord', {
			params: {
				year: year
			}
		}).then(res => {
			commit('loadUserYearRecord2', res.data);
		})
	}
}

// mutations
const mutations = {
	loadYearRecord: (state, data) => {
		var flag = false;
		state.yearRecord.forEach(value => {
			if(value.year == data.year) {
				value.data = data.data;
				flag = true;
			}
		})
		if(flag == false) {
			state.yearRecord.push(data);
		}
	},
	loadYearRecord2: (state, data) => {
		var flag = false;
		state.yearRecord2.forEach(value => {
			if(value.year == data.year) {
				value.data = data.data;
				flag = true;
			}
		})
		if(flag == false) {
			state.yearRecord2.push(data);
		}
	},
	loadUserYearRecord: (state, data) => {
		var flag = false;
		state.userYearRecord.forEach(value => {
			if(value.year == data.year) {
				value.data = data.data;
				flag = true;
			}
		})
		if(flag == false) {
			state.userYearRecord.push(data);
		}
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}