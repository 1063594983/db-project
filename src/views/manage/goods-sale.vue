<template>
	<div>
		<goods-sale-list :goods-sale-list="goodsSaleList"></goods-sale-list>
	</div>
</template>

<script>
	import goodsSaleList from '@/components/manage/goods-sale-list'
	export default {
		data() {
			return {
				
			}
		},
		created() {
			
			console.log(this.$store.state.saleRecord.currentMonthRecord)
		},
		computed: {
			goodsSaleList() {
				return this.$store.state.saleRecord.currentMonthRecord;
			}
		},
		components: {
			goodsSaleList
		}
	}
</script>

<style>
</style>