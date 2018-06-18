<template>
	<div id="form-body">
		<el-row>
			<el-col :span="12" :offset="6">
				<el-button type="text" style="font-size: 25px; font-weight: bold;">添加优惠</el-button>
			</el-col>
		</el-row>
		<el-form ref="form" :model="importForm" :rules="rules" class="demo-ruleForm">
			<el-row>
				<el-col :span="10">
					<el-form-item label="商品名称" prop="goodsName">
						<el-autocomplete v-model="importForm.goodsName" :fetch-suggestions="querySearch" placeholder="请输入商品名称"></el-autocomplete>
					</el-form-item>
				</el-col>
				<el-col :span="8" :offset="4">
					<el-form-item label="进货量" prop="importAmount">
						<el-input v-model="importForm.importAmount"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-col :span="12" :offset="6">
				<el-form-item>
					<el-button type="primary" @click="submitForm('form')">立即创建</el-button>
					<el-button @click="cancel">取消</el-button>
				</el-form-item>
			</el-col>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				importForm: {
					goodsName: '',
					importAmount: ''
				},
				rules: {
					goodsName: [{
						required: true,
						message: '请输入商品名称',
						trigger: 'blur'
					}],
					importAmount: [{
						required: true,
						message: '进货量不能为空',
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						var form = {};
						form.goodsName = this.importForm.goodsName;
						form.importAmount = this.importForm.importAmount;
						this.$emit('add', form);
						this.importForm.goodsName = '';
						this.importForm.importAmount = '';
					} else {
						return false;
					}
				});
			},
			querySearch(queryString, cb) {
				var goodsNameList = this.$store.getters.getUnDiscountGoodsNameList;
				var results = queryString ? goodsNameList.filter(this.createFilter(queryString)) : goodsNameList;
				// 调用 callback 返回建议列表的数据
				cb(results);
			},
			createFilter(queryString) {
				return(goodsName) => {
					return(goodsName.value.indexOf(queryString) != -1);
				};
			},
			cancel() {
				this.$emit('cancel');
			}
		}
	}
</script>

<style>

</style>