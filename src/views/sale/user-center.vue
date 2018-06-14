<template>
	<div>
		<el-row>
			<el-col :span="8" :offset="8">
				<user-info :totalMoney="totalMoney" 
					:user-id="$cookieStore.getCookie('username')"
					@logout="handleLogout"></user-info>
			</el-col>
		</el-row>
		<br />
		<br />
		<el-row>
			<el-col :span="8" :offset="8">
				<order-pane @confirmReceive="handleConfirmReceive" :user-sale-record="userRecord"></order-pane>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import userInfo from '@/components/sale/user-info'
	import orderPane from '@/components/sale/order-pane'
	export default {
		data() {
			return {
				
			}
		},
		computed: {
			userRecord() {
				return this.$store.state.customer.customerRecord
			},
			saleRecord() {
				var result;
				this.$store.state.userSaleRecord.forEach(value => {
					if(value.customerId == this.$cookieStore.getCookie('username')) {
						result = value.saleRecord;
					}
				})
				return result;
			},
			totalMoney() {
				var result = this.$store.state.customer.customerInfo[0].total_money;
				return result;
			}
		},
		created() {
			this.$store.dispatch('loadCustomerInfo');
			this.$store.dispatch('loadCustomerRecord')
			console.log(this.$store.state.customer.customerRecord)
		},
		methods: {
			getRecords() {
				var result;
				this.$store.state.userSaleRecord.forEach(value => {
					if(value.customerId == this.$cookieStore.getCookie('username')) {
						result = value;
					}
				})
				return result;
			},
			handleConfirmReceive(recordId) {
				this.$axios.post('/api/goods/confirmReceive', {
					recordId: recordId
				}).then(res => {
					this.$message({
						message: '确认成功',
						type: 'success'
					})
				})
				this.$store.dispatch('loadCustomerRecord')
			},
			handleLogout() {
				this.$cookieStore.delCookie('username');
				this.$router.push({
					path: '/'
				})
			},
			getRecordsFromTo(date1, date2) {
				var result = [];
				this.saleRecord.forEach(value => {
					if(value.record_time >= date1 && value.record_time <= date2) {
						result.push(value);
					}
				})
				return result;
			}
		},
		components: {
			userInfo,
			orderPane
		}
	}
</script>

<style>
</style>