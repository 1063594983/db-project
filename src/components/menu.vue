<template>
	<div>
		<el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @select="handleSelect">
			<el-menu-item index="login">
				<i class="el-icon-menu"></i>
				<span slot="title">用户登录</span>
			</el-menu-item>
			<el-menu-item index="register">
				<i class="el-icon-document"></i>
				<span slot="title">用户注册</span>
			</el-menu-item>
			<el-menu-item index="manage-login">
				<i class="el-icon-setting"></i>
				<span slot="title">管理员登录</span>
			</el-menu-item>
		</el-menu>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: 'login'
			}	
		},
		created() {
			this.activeIndex = this.$router.currentRoute.path.split('/')[1];
		},
		methods: {
			handleSelect(index) {
				this.$router.push({
					path: '/' + index
				})
			}
		}
	}
</script>

<style>

</style>