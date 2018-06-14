<template>
	<el-menu :default-active="active" class="el-menu-vertical-demo" 
		@open="handleOpen" @close="handleClose" 
		:collapse="isCollapse" @select="handleSelect" background-color="#545c64"
		text-color="#fff" active-text-color="#ffd04b">
		<el-submenu index="1">
			<template slot="title">
				<i class="el-icon-location"></i>
				<span slot="title">员工管理</span>
			</template>
			<el-menu-item-group>
				<el-menu-item index="employee-info">员工信息</el-menu-item>
			</el-menu-item-group>
		</el-submenu>
		<el-submenu index="2">
			<template slot="title">
				<i class="el-icon-location"></i>
				<span slot="title">店铺管理</span>
			</template>
			<el-menu-item-group>
				<el-menu-item index="sale-chart">销售情况</el-menu-item>
				<el-menu-item index="sale-linechart">销售变化情况</el-menu-item>
				<el-menu-item index="discount">优惠活动</el-menu-item>
				<el-menu-item index="stock">商品库存</el-menu-item>
				<el-menu-item index="goods-sale">商品销量情况</el-menu-item>
			</el-menu-item-group>
		</el-submenu>
	</el-menu>
</template>

<script>
	export default {
		data() {
			return {
				isCollapse: false,
			};
		},
		props: {
			active: String
		},
		methods: {
			handleOpen(key, keyPath) {
				
			},
			handleClose(key, keyPath) {
				
			},
			handleSelect(key, keyPath) {
				this.$emit('message', key);
				this.$router.push({
					path: '/manage/' + key
				})
			}
		}
	}
</script>

<style>
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 200px;
		min-height: 400px;
	}
</style>