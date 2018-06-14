<template>
	<el-card class="box-card">
		<el-row>
			<h3>用户名: {{userId}}</h3>
			<h4>总消费: {{totalMoney.toFixed(2)}}元</h4>
			<el-button type="primary" @click="goto" round>我的购物统计情况</el-button>
			<el-button @click="logout" round>注销</el-button>
		</el-row>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props: {
			userId: {
				type: String
			},
			totalMoney: {
				type: Number,
				default: 0
			}
		},
		created() {
			
		},
		methods: {
			logout() {
				this.$emit('logout');
			},
			goto() {
				this.$router.push({
					path: '/sale/user-shopping-chart'
				})
			}
		}
	}
</script>

<style>

</style>