<template>
	<div>
		<el-row>
			<el-popover v-model="seem" placement="top" width="400" trigger="click">
				<el-collapse @change="handleChange">
					<el-collapse-item title="折扣" name="1">
						<el-radio v-model="filterOption.discount" label="1">所有商品</el-radio>
						<el-radio v-model="filterOption.discount" label="2">打折商品</el-radio>
						<el-radio v-model="filterOption.discount" label="3">未打折商品</el-radio>
					</el-collapse-item>
					<el-collapse-item title="价格区间(元)" name="2">
						<el-col :span="8" :offset="2">
							<el-input v-model="filterOption.price.minPrice" placeholder="最低价"></el-input>
						</el-col>
						<el-col :span="8" :offset="4">
							<el-input v-model="filterOption.price.maxPrice" placeholder="最高价"></el-input>
						</el-col>
					</el-collapse-item>
					<el-collapse-item title="全部类目" name="3">
						<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
						<div style="margin: 15px 0;"></div>
						<el-checkbox-group v-model="filterOption.type" @change="handleCheckedTypesChange">
							<el-checkbox v-for="type in typeNames" :label="type" :key="type">{{type}}</el-checkbox>
						</el-checkbox-group>
					</el-collapse-item>
				</el-collapse>
				<br />
				<el-col :span="8" :offset="16">
					<el-button type="primary" @click="handleFilter" round>确定</el-button>
				</el-col>
				<el-button slot="reference">筛选</el-button>
			</el-popover>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				filterOption: {
					discount: '1',
					price: {
						minPrice: '',
						maxPrice: ''
					},
					type: []
				},
				isIndeterminate: true,
				checkAll: false,
				seem: false
			}
		},
		computed: {
			typeNames() {
				var result = [];
				this.goodsTypes.forEach(value => {
					result.push(value.type_name);
				})
				return result;
			},
			goodsTypes() {
				return this.$store.state.goodsType;
			}
		},
		created() {
			this.typeNames.forEach(value => {
				this.filterOption.type.push(value);
			})
		},
		methods: {
			handleChange() {

			},
			handleCheckAllChange(val) {
				this.filterOption.type = val ? this.typeNames : [];
				this.isIndeterminate = false;
			},
			handleCheckedTypesChange(value) {
				let checkedCount = value.length;
				this.checkAll = checkedCount === this.typeNames.length;
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.typeNames.length;
			},
			handleFilter() {
				this.$emit('filter', this.filterOption);
				this.seem = false;
			}
		}
	}
</script>

<style>

</style>