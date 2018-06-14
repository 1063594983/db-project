<template>
	<div>
		<el-table :data="pageList" border style="width: 100%">
			<el-table-column prop="goods_name" label="商品名称" width="250">
			</el-table-column>
			<el-table-column sortable prop="stock" label="库存" width="180">
			</el-table-column>
		</el-table>
		<el-pagination :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="stockList.length">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				currentPage: 1,
				pageSize: 5
			}
		},
		computed: {
			pageList() {
				var result = [];
				var start = (this.currentPage - 1) * this.pageSize;
				var end = (start + this.pageSize) < this.stockList.length ? (start + this.pageSize) : this.stockList.length;
				for(let i = start; i < end; i++) {
					result.push(this.stockList[i]);
				}
				return result;
			}
		},
		props: {
			stockList: {
				type: Array
			}
		}
	}
</script>

<style>

</style>