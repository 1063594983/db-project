<template>
	<div :style="{cursor: 'pointer', height: height, width: width}" @mouseenter="enter" @mouseleave="leave" @click="gotoGoodsDetails">
		<el-card class="box-card">
			<img :src="JSON.parse(goodsDetails.goods_image)[0].src" />
			<p style="color: red;" v-if="!isDiscount()"><b>￥{{ goodsDetails.goods_price }}</b></p>
			<p style="color: red;" v-else=""><s style="color: black;">￥{{ goodsDetails.goods_price }}</s>
				<b>￥{{ realPrice }}</b>
			</p>
			<p :style="{textDecoration: goodsNameStyle}">{{ goodsDetails.goods_name }}</p>
			<el-button @click.stop="addToCart" round>加入购物车</el-button>
		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				goodsNameStyle: "none",
				discount: 1,
				rank: 0
			}
		},
		props: {
			goodsDetails: {
				type: Object
			},
			height: {
				type: String,
				default: '75%'
			},
			width: {
				type: String,
				default: '75%'
			}
		},
		computed: {
			realPrice() {
				var price = this.goodsDetails.goods_price * this.$store.getters.getDiscountById(this.goodsDetails.goods_id);
				var price = price.toFixed(2);
				return price;
			}
		},
		created() {
			this.rank = (this.goodsDetails.rank * 1).toFixed(2) * 1;;
		},
		methods: {
			enter() {
				this.goodsNameStyle = "underline";
			},
			leave() {
				this.goodsNameStyle = "none";
			},
			addToCart() {
				this.$store.dispatch('addOneItem', this.goodsDetails.goods_id);
			},
			gotoGoodsDetails() {

				this.$router.push({
					path: '/sale/goods/' + this.goodsDetails.goods_id
				})
				/*
				const {href} = this.$router.resolve({
					path: '/sale/goods/' + this.goodsDetails.goods_id
				})
				window.open(href, "_blank");
				*/
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
	
	p {
		font-size: 14px;
	}
</style>