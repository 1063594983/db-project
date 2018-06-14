<template>
	<div>
		<el-card>
			<el-row>
				<el-col :span="8">
					<img :src="JSON.parse(goodsDetails.goods_image)[0].src" />
				</el-col>
				<el-col :span="12">
					<el-row>
						<el-col>
							<p>{{goodsDetails.goods_name}}</p>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8">
							<p style="color: red;" v-if="!isDiscount()"><b>￥{{ goodsDetails.goods_price }}</b></p>
							<p style="color: red;" v-else=""><s style="color: black;">￥{{ goodsDetails.goods_price }}</s>
								<b>￥{{ realPrice }}</b>
							</p>
						</el-col>
						&nbsp;&nbsp;
						<i class="el-icon-remove" @click="decrease"></i> {{goodsAmount}}
						<i class="el-icon-circle-plus" @click="increase"></i>
					</el-row>
				</el-col>
				<el-col :span="4" style="margin-top: 30px;">
					<i class="el-icon-circle-close-outline" title="删除" @click="remove"></i>
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
			goodsDetails: Object,
			goodsAmount: Number
		},
		computed: {
			realPrice() {
				var price = this.goodsDetails.goods_price * this.$store.getters.getDiscountById(this.goodsDetails.goods_id);
				var price = price.toFixed(2);
				return price;
			}
		},
		methods: {
			decrease() {
				this.$store.commit('decreaseOneItem', this.goodsDetails.goods_id);
			},
			increase() {
				this.$store.dispatch('addOneItem', this.goodsDetails.goods_id);
			},
			remove() {
				this.$store.commit('removeItem', this.goodsDetails.goods_id);
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
	
	i {
		cursor: pointer;
	}
</style>