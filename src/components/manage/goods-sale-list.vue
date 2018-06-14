<template>
	<div>
		<el-table :data="pageList" border style="width: 100%">
			<el-table-column prop="goods_name" label="商品名称" width="250">
			</el-table-column>
			<el-table-column prop="num" label="本月销量" width="250">
			</el-table-column>
		</el-table>
		<el-pagination :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="goodsSaleList.length">
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
				var end = (start + this.pageSize) < this.goodsSaleList.length ? (start + this.pageSize) : this.goodsSaleList.length;
				for(let i = start; i < end; i++) {
					result.push(this.goodsSaleList[i]);
				}
				return result;
			}
		},
		props: {
			goodsSaleList: {
				type: Array
			}
		}
	}
</script>

<style>

</style>