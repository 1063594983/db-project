<template>
	<div id="footer-nav">
		<el-row>
			<el-col :span="2" v-for="(item, index) in url" :offset="index == 0 ? 4 : 0" :key="index">
				<router-link :to="'/sale/' + item.url">{{ item.title }}</router-link>&nbsp;|
			</el-col>
			<el-col :span="4" :offset="1">
				Copyright &copy; ECNU
				<a href="https://github.com/1063594983/db-project.git" target="_blank">Github</a>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				url: [{
					title: '商品列表',
					url: 'goods-sale'
				}, {
					title: '购物结算',
					url: 'checkout'
				}, {
					title: '个人中心',
					url: 'user-center'
				}, {
					title: '联系我们',
					url: 'contact-us'
				}, {
					title: '关于...',
					url: 'about'
				}]
			}
		},
		methods: {

		}
	}
</script>

<style scoped>
	a {
		text-decoration: none;
	}
	
	#footer-nav {

	}
</style>