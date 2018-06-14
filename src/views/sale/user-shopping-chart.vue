<template>
	<div>
		<el-row>
			<el-col :span="4" :offset="6">
				<el-button @click="goto('habit')" round>我的购物习惯</el-button>
			</el-col>
			<el-col :span="4">
				<el-button @click="goto('consume')" round>我的消费情况</el-button>
			</el-col>
			<el-col :span="4">
				<el-button @click="goto('habit')" round>我的购物习惯</el-button>
			</el-col>
		</el-row>
		<br />
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goto(value) {
				this.$router.push({
					path: '/sale/user-shopping-chart/' + value
				})
			}
		},
		components: {
			
		}
	}
</script>

<style>
</style>