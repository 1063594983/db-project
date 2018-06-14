<template>
	<div>
		<el-row>
			<el-col :sapn="12">
				<h3 v-if="type==1">待收货</h3>
				<h3 v-if="type==2">待评价</h3>
				<h3 v-if="type==3">我的订单</h3>
			</el-col>
		</el-row>
		<el-collapse>
			<el-collapse-item v-for="(order, x) in showList" :title="new Date(order.record_time * 1).datetime()" :key="x">
				<order-card :goods="order.goods" :total-price="order.total_price"
					 :type="type" @confirmReceive="handleConfirmReceive" :record-id="order.record_id"></order-card>
			</el-collapse-item>
			<el-pagination :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="orderList.length">
			</el-pagination>
		</el-collapse>
	</div>
</template>

<script>
	
	import orderCard from './order-card'
	export default {
		data() {
			return {
				currentPage: 1
			}
		},
		props: {
			orderList: {
				type: Array
			},
			type: {
				type: Number
			},
			pageSize: {
				type: Number,
				default: 5
			}
		},
		computed: {
			showList() {
				var result = [];
				var start = (this.currentPage - 1) * this.pageSize;
				var end = (start + this.pageSize) > this.orderList.length ? this.orderList.length : (start + this.pageSize)
				for(let i = start; i < end; i++) {
					result.push(this.orderList[i]);
				}
				return result;
			}
		},
		created() {
			
		},
		methods: {
			getOrder(val) {
				var index = (this.currentPage - 1) * this.pageSize + val - 1;
				if(index < this.orderList.length) {
					return this.orderList[index];
				} else {
					return false;
				}
			},
			handleConfirmReceive(recordId) {
				this.$emit('confirmReceive', recordId);
			}
		},
		components: {
			orderCard
		}
	}
</script>

<style>

</style>