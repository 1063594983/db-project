<template>
	<div>
		<el-table :data="employeeList" border style="width: 100%">
			<el-table-column prop="emp_name" label="姓名" width="150">
			</el-table-column>
			<el-table-column prop="emp_gender" label="性别" width="120">
			</el-table-column>
			<el-table-column sortable prop="emp_start_time" label="入职时间" width="120">
			</el-table-column>
			<el-table-column sortable prop="emp_birthday" label="生日" width="120">
			</el-table-column>
			<el-table-column prop="emp_tel" label="电话" width="300">
			</el-table-column>
			<el-table-column sortable prop="emp_salary" label="薪水" width="120">
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="100">
				<template slot-scope="scope">
					<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
					<el-button type="text" size="small" @click="editHandler(scope.row)">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
			<span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
  </span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				centerDialogVisible: false
			}
		},
		methods: {
			handleClick(row) {
				console.log(row);
			},
			editHandler(row) {
				this.centerDialogVisible = true;
				console.log(row.emp_id);
			}
		},
		props: {
			employeeList: {
				type: Array
			}
		}
	}
</script>

<style>

</style>