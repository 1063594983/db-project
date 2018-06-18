<template>
	<div>
		<el-table :data="typeNames" border style="width: 100%">
			<el-table-column type="index" prop="type_name" label="序号" width="50">
			</el-table-column>
			<el-table-column prop="type_name" label="商品类别" width="100">
			</el-table-column>
			<el-table-column label="喜爱程度" width="300">
				<template slot-scope="scope">
					<el-radio-group v-model="habit[scope.$index]">
						<el-radio :label="0">不喜欢</el-radio>
						<el-radio :label="2">喜欢</el-radio>
						<el-radio :label="5">非常喜欢</el-radio>
					</el-radio-group>
				</template>
			</el-table-column>
		</el-table>
		<br />
		<span slot="footer" class="dialog-footer">
    		<el-button @click="cancel">取 消</el-button>
    		<el-button type="primary" @click="confirm">确 定</el-button>
  		</span>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				habit: [2, 2, 2, 2, 2, 2, 2, 2]
			}
		},
		computed: {
			typeNames() {
				return this.$store.state.goods.typeNames;
			}
		},
		created() {
			this.$store.dispatch('loadTypeNames');
		},
		methods: {
			cancel() {
			},
			confirm() {
				this.$emit('confirm', this.habit);
			}
		}
	}
</script>

<style>

</style>