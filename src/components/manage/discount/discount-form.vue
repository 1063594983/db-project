<template>
	<div id="form-body">
		<el-row>
			<el-col :span="12" :offset="6">
				<el-button type="text" style="font-size: 25px; font-weight: bold;">添加优惠</el-button>
			</el-col>
		</el-row>
		<el-form ref="form" :model="discountForm" :rules="rules" class="demo-ruleForm">
			<el-form-item label="商品名称" prop="goodsName">
				<el-autocomplete v-model="discountForm.goodsName" :fetch-suggestions="querySearch" placeholder="请输入商品名称"></el-autocomplete>
			</el-form-item>
			<el-form-item label="开始时间" prop="startTime">
				<el-date-picker v-model="discountForm.startTime" type="datetime" placeholder="选择日期时间">
				</el-date-picker>
			</el-form-item>
			<el-row>
				<el-col :span="8">
					<el-form-item label="折扣" prop="discount">
						<el-select v-model="discountForm.discount" placeholder="请选择折扣">
							<el-option v-for="item in discountOption" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12" :offset="2">
					<el-form-item label="持续时间" prop="stayDays">
						<el-input v-model="discountForm.stayDays">
							<template slot="append">天</template>
						</el-input>
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
				discountForm: {
					goodsName: '',
					discount: '',
					startTime: '',
					stayDays: ''
				},
				discountOption: [{
					value: 0.9,
					label: '九折'
				}, {
					value: 0.8,
					label: '八折'
				}, {
					value: 0.7,
					label: '七折'
				}, {
					value: 0.6,
					label: '六折'
				}, {
					value: 0.5,
					label: '五折'
				}],
				rules: {
					goodsName: [{
						required: true,
						message: '请输入商品名称',
						trigger: 'blur'
					}],
					discount: [{
						required: true,
						message: '请选择折扣',
						trigger: 'blur'
					}],
					startTime: [{
						required: true,
						message: '请选择开始时间',
						trigger: 'blur'
					}],
					stayDays: [{
						required: true,
						message: '请输入天数',
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
						form.goodsName = this.discountForm.goodsName;
						form.discount = this.discountForm.discount;
						form.startTime = this.discountForm.startTime;
						form.stayDays = this.discountForm.stayDays;			
						this.$emit('add', form);
						this.discountForm.goodsName = '';
						this.discountForm.discount = '';
						this.discountForm.startTime = '';
						this.discountForm.stayDays = '';

					} else {
						console.log('error submit!!');
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