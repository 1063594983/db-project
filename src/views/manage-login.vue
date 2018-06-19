<template>

	<el-container>
		<el-aside width="150px">
			<login-menu></login-menu>
		</el-aside>
		<el-main>
			<div id="form-body">
				<el-col :span="12" :offset="6">
					<el-button type="text" style="font-size: 25px; font-weight: bold;">管理员登录</el-button>
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
							<el-button type="primary" @click="submitForm('form')">立即登录</el-button>
							<el-button @click="resetForm('form')">取消</el-button>
						</el-form-item>
					</el-col>
				</el-form>
			</div>
		</el-main>
	</el-container>
</template>
<script>
	import loginMenu from '@/components/menu'
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

		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate(valid => {
					if(valid) {
						this.$axios.post('/api/user/checkManager', {
							username: this.form.username,
							password: this.form.password
						}).then(response => {
							var str = response.data;
							if(str != 'Refuse!') {
								this.$router.push({
									path: '/manage'
								});
							} else {
								//console.log('账号或密码错误');
								this.$message.error('账号或密码错误!');
							}
						})
					} else {
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		},
		components: {
			loginMenu
		}
	}
</script>

<style scoped>
	#form-body {
		margin-top: 60px;
	}
</style>