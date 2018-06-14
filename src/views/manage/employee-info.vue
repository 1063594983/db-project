<template>
	<div>
		<employee-list :employee-list="employeeList"></employee-list>
	</div>
</template>

<script>
	import employeeList from '@/components/manage/employee-list'
	export default {
		data() {
			return {
				employeeList: []
			}
		},
		created() {
			this.$axios.get('/api/emp/getEmp').then(res => {
				this.employeeList = res.data;
			})
		},
		components: {
			employeeList
		}
	}
</script>

<style>
</style>