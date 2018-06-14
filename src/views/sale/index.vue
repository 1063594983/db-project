<template>
	<el-container>
		<el-aside width="50px">
			<side-menu id="shoppingcart"></side-menu>
		</el-aside>
		<el-container>
			<el-header>
				<h1>头部</h1></el-header>
			<el-main>
				<router-view></router-view>
			</el-main>
			<el-footer>
				<h1>尾部</h1></el-footer>
		</el-container>
	</el-container>
</template>

<script>
	import sideMenu from '@/components/sale/sidemenu'
	export default {
		data() {
			return {
				
			}
		},
		components: {
			sideMenu
		}
	}
</script>

<style>
#shoppingcart {
		position: fixed;
		left: 0;
		top: 10%;
	}
</style>