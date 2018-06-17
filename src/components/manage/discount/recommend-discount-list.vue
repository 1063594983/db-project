<template>
	<div>
		<el-table :data="discountList" border style="width: 100%">
			<el-table-column prop="goods_name" label="商品名称" width="200">
			</el-table-column>
			<el-table-column sortable prop="discount" label="折扣" width="120">
			</el-table-column>
			<el-table-column sortable prop="start_time" label="开始时间" width="180">
			</el-table-column>
			<el-table-column sortable prop="end_time" label="结束时间" width="180">
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="100">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="remove(scope.$index)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			
			}
		},
		props: {
			discountList: {
				type: Array
			}
		},
		methods: {
			remove(index) {
				console.log(index)
				this.$emit('remove', index);
			}
		}
	}
</script>

<style>

</style>