<template>
	<el-container>
		<el-aside width="50px">
			<side-menu id="shoppingcart"></side-menu>
		</el-aside>
		<el-container>
			<el-header>
				<header-nav></header-nav>
			</el-header>
			<el-main>
				<router-view></router-view>
			</el-main>
			<el-footer>
				<footer-nav></footer-nav>
			</el-footer>
		</el-container>
	</el-container>
</template>

<script>
	import sideMenu from '@/components/sale/sidemenu'
	import headerNav from '@/components/sale/header-nav'
	import footerNav from '@/components/sale/footer-nav'
	export default {
		data() {
			return {
				
			}
		},
		components: {
			sideMenu,
			headerNav,
			footerNav
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