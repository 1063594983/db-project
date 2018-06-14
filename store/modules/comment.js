import Vue from 'vue'

const state = {
	comments: []
}

// getters
const getters = {
	getCommentByGoodsId: (state) => (goods_id) => {
		return state.comments.filter(comment => comment.goods_id == goods_id);
	}
}

// actions
const actions = {
	loadComments(context) {
		new Vue().$axios.get('/api/comment/getAllComment').then(res => {
			context.commit('loadComments', res.data);
		})
	}
}

// mutations
const mutations = {
	loadComments(state, comments) {
		state.comments = comments;
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}