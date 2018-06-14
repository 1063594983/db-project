<template>
	<div>
		<el-card class="box-card">
			<el-row>
				<el-col :span="8">
					<el-badge :value="orderList1.length" class="item">
						<el-button type="text" @click="change(1)">待收货</el-button>
					</el-badge>
				</el-col>
				<el-col :span="8">
					<el-badge :value="orderList2.length" class="item">
						<el-button type="text" @click="change(2)">待评价</el-button>
					</el-badge>
				</el-col>
				<el-badge :value="userSaleRecord.length" class="item">
					<el-button type="text" @click="change(3)">我的订单</el-button>
				</el-badge>
			</el-row>
		</el-card>
		<el-card>
			<order-list @confirmReceive="handleConfirmReceive" :order-list="getOrderList(orderType)" :type="orderType"></order-list>
		</el-card>
	</div>
</template>

<script>
	
	import orderList from './order-list'
	export default {
		data() {
			return {
				orderType: 1
			}
		},
		props: {
			userSaleRecord: {
				type: Array,
				default: []
			}
		},
		computed: {
			orderList1() {
				var result = [];
				this.userSaleRecord.forEach(value => {
					if(value.is_received == '0') {
						result.push(value);
					}
				})
				return result;
			},
			orderList2() {
				var result = [];
				this.userSaleRecord.forEach(value => {
					if(value.is_received == "1" && value.is_commented == '0') {
						result.push(value);
					}
				})
				return result;
			}
		},
		methods: {
			change(val) {
				this.orderType = val;
			},
			getOrderList(val) {
				switch(val) {
					case 1:
						return this.orderList1;
						break;
					case 2:
						return this.orderList2;
						break;
					case 3:
						return this.userSaleRecord;
						break;
					default:
						break;
				}
			},
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
				this.$emit('confirmReceive', recordId);
			}
		},
		components: {
			orderList
		}
	}
</script>

<style>

</style>