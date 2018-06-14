<template>
	<div>
		<el-table :data="pageList" border style="width: 100%">
			<el-table-column prop="goods_name" label="商品名称" width="250">
			</el-table-column>
			<el-table-column label="进货量" width="150">
				<template slot-scope="scope">
					<el-input v-model="importData[scope.$index]"></el-input>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="importList.length">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				currentPage: 1,
				pageSize: 5,
				importData: []
			}
		},
		computed: {
			pageList() {
				var result = [];
				var start = (this.currentPage - 1) * this.pageSize;
				var end = (start + this.pageSize) < this.importList.length ? (start + this.pageSize) : this.importList.length;
				for(let i = start; i < end; i++) {
					result.push(this.importList[i]);
				}
				return result;
			},
			myList() {
				return this.importList;
			}
		},
		created() {
			this.importList.forEach(value => {
				this.importData.push(value.amount);
			})
		},
		props: {
			importList: {
				type: Array
			}
		}
	}
</script>

<style>

</style>