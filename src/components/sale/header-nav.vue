<template>
	<div id="header-nav">
		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" 
			@select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
			<el-menu-item v-for="(item, index) in url" :index="item.url" 
				:key="index ">{{ item.title }}</el-menu-item>
			
	</el-menu>
</div>
</template>

<script>
	export default {
		data() {
			return {
				url: [{
					title: '商品列表',
					url: 'goods-sale'
				},{
					title: '购物结算',
					url: 'checkout'
				},{
					title: '个人中心',
					url: 'user-center'
				},{
					title: '联系我们',
					url: 'contact-us'
				},{
					title: '关于...',
					url: 'about'
				}],
				activeIndex: 'goods-sale'
			}
		},
		methods: {
			handleSelect(index, path) {
				this.$router.push({
					path: '/sale/' + index
				})
			}
		}
	}
</script>

<style scoped>
	#header-nav {
		position: fixed;
		top: 0;
		width: 100%;
		left: 0;
		z-index: 1;
	}
</style>