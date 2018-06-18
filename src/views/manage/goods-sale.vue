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