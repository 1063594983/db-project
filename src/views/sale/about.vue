<template>
	<div>
		<h2>线上超市销售和管理系统</h2>
		<h4>小组成员</h4>
		<el-col :span="24">
			<ul>
			<li v-for="m in member">{{m.name}}</li>
		</ul>
			
		</el-col>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				member: [{
					name: '邹璇霖',
					job: ''
				}, {
					name: '宫斌凯',
					job: ''
				}, {
					name: '徐晟凯',
					job: ''
				}]
			}
		}
	}
</script>

<style>

</style>