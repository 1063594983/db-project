<template>
	<div id="form-body">
		<el-col :span="12" :offset="6">
			<el-button type="text" style="font-size: 25px; font-weight: bold;">用户登录</el-button>
		</el-col>
		<el-form ref="form" :model="form" :rules="rules" label-width="80px" class="demo-ruleForm">
			<el-col :span="12" :offset="6">
				<el-form-item label="用户名" prop="username">
					<el-input v-model="form.username"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="12" :offset="6">
				<el-form-item label="密码" prop="password">
					<el-input v-model="form.password" type="password"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="12" :offset="6">
				<el-form-item>
					<el-button type="primary" @click="submitForm('form')">立即创建</el-button>
					<el-button @click="resetForm('form')">取消</el-button>
				</el-form-item>
			</el-col>
		</el-form>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				form: {
					username: '',
					password: ''
				},
				rules: {
					username: [{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}]
				}
			}
		},
		computed: {
			myName() {
				return this.$store.state.username;
			}
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate(valid => {
					if(valid) {
						this.$axios.post('/api/user/checkUser', {
							username: this.form.username,
							password: this.form.password
						}).then(response => {
							var str = response.data;
							if(str != 'Refuse!') {
								console.log(str);
								this.$router.push({
									path: '/sale/goods-sale'
								});
							} else {
								//console.log('账号或密码错误');
								this.$message.error('账号或密码错误!');
							}
						})
					} else {
						console.log('error submit!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
	
</script>

<style>
	#form-body {
		margin-top: 60px;
	}
</style>