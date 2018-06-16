<template>
	<div>
		<el-row>
			<el-col :span="6" :offset="4">
				<el-row>
					<el-col :span=24>
						<img :src="imgSrc[0].src" />
					</el-col>
				</el-row>
			</el-col>
			<el-col :span="6" :offset="2">
				<el-row>
					<b>{{ goodsDetails.goods_name }}</b>
				</el-row>
				<br />
				<el-row>
					价格: <p style="color: red;" v-if="!isDiscount()"><b>￥{{ goodsDetails.goods_price }}</b></p>
			<p style="color: red;" v-else=""><s style="color: black;">￥{{ goodsDetails.goods_price }}</s>
				<b>￥{{ realPrice }}</b>
			</p>
				</el-row>
				<br />
				<hr />
				<el-row>
					<el-col :span="8" :offset="1">
						月销量&nbsp;<b style="color: red;">{{ monthSale }}</b>
					</el-col>
					<el-col :span="8" :offset="4">
						累计评价&nbsp;<b style="color: red;">{{ commentSize }}</b>
					</el-col>
				</el-row>
				<hr />
				<br />
				<el-row>
					产地 <b>{{goodsDetails.goods_source}}</b>
				</el-row>
				<br />
				<el-row>
					数量: <el-input-number v-model="goodsAmount":min="0" :max="$store.getters.getGoodsStockById(goodsDetails.goods_id)" label="描述文字"></el-input-number>
					库存 {{goodsDetails.remain}}
				</el-row>
				<br />
				<br />
				<el-row>
					<el-col>
						<el-button @click="addCart" type="primary">加入购物车</el-button>
					</el-col>
				</el-row>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				goodsAmount: 1
			}
		},
		computed: {
			imgSrc() {
				return JSON.parse(this.goodsDetails.goods_image);
			},
			realPrice() {
				var price = this.goodsDetails.goods_price * this.$store.getters.getDiscountById(this.goodsDetails.goods_id);
				var price = price.toFixed(2);
				return price;
			},
			monthSale() {
				return this.$store.getters.getMonthRecordById(this.goodsDetails.goods_id);
			}
		},
		props: {
			goodsDetails: Object,
			commentSize: {
				type: Number
			}
		},
		created() {
			
		},
		methods: {
			addCart() {
				this.$store.dispatch('addItems', {
					goods_id: this.goodsDetails.goods_id,
					amount: this.goodsAmount
				});
			},
			isDiscount() {
				return this.$store.getters.isDiscount(this.goodsDetails.goods_id);
			}
		}
	}
</script>

<style>
	img {
		width: 100%;
		height: 100%;
	}
	el-row, el-col {
		margin-top: 20px;
	}
</style>