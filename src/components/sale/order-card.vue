<template>
	<div>
		<el-card>
			<el-row v-for="(record, index) in goods" :key="index">
				<el-col :span="8">
					<img :src="JSON.parse($store.getters.getGoodsById(record.goods_id).goods_image)[0].src" />
				</el-col>
				<el-col :span="12">
					<el-row>
						<el-col>
							<h3>{{$store.getters.getGoodsById(record.goods_id).goods_name}}</h3>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<b style="color: red;">￥{{$store.getters.getGoodsById(record.goods_id).goods_price}}</b>
							<br />
							X {{record.amount}}
						</el-col>
					</el-row>
				</el-col>
			</el-row>
			<el-row>
				<el-col :offset="5">
					<h3>共{{goodsNum}}件商品 合计: ￥{{totalPrice}}</h3>
				</el-col>
			</el-row>
			<el-row>
				<el-col :offset="10">
					<el-button v-if="type==1" type="primary" @click="confirmReceive" round>确认收货</el-button>
					<el-button v-if="type==2" type="primary" round>评价</el-button>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props: {
			goods: Array,
			type: Number,
			totalPrice: Number
		},
		computed: {
			goodsNum() {
				var result = 0;
				this.goods.forEach(value => {
					result += value.amount;
				})
				return result;
			},
			goodsList() {
				return this.$store.state.goodsList;
			}
		},
		methods: {
			confirmReceive() {
				/*
				this.$axios.post('/api/goods/confirmReceive', {
					recordId: this.recordId
				}).then(res => {
					this.$message({
						message: '已确认收货',
						type: 'success'
					});
				})
				*/
				this.$emit('confirmReceive', this.recordId);
			}
		}
	}
</script>

<style>
	img {
		width: 100%;
		height: 100%;
	}
	
	i {
		cursor: pointer;
	}
</style>