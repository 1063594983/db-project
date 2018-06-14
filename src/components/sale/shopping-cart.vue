<template>
	<div style="width: 300px;">
		<el-row v-for="item in shoppingCart" :key="item.goods_id">
			<cart-item :goods-details="$store.getters.getGoodsById(item.goods_id)" :goods-amount="item.amount"></cart-item>
		</el-row>
		<el-row v-if="shoppingCart.length != 0">
			<el-col :offset="5">
				<h3>共{{goodsNum}}件商品 合计: ￥{{totalPrice}}</h3>
			</el-col>
		</el-row>
		<el-row style="margin-top: 20px;" v-if="shoppingCart.length != 0">
			<el-col :span="12" :offset="2">
				<el-popover placement="top" width="160" v-model="visible">
					<p>你确定清空购物车吗?</p>
					<div style="text-align: right; margin: 0">
						<el-button size="mini" type="text" @click="visible = false">取消</el-button>
						<el-button type="primary" size="mini" @click="clear">确定</el-button>
					</div>

					<el-button slot="reference" round>清空购物车</el-button>
				</el-popover>
			</el-col>
			<el-col :span="8" :offset="2">
				<el-button @click="goto" round>结算</el-button>
			</el-col>
		</el-row>
		<el-row v-if="shoppingCart.length == 0">
			当前购物车为空
		</el-row>

	</div>
</template>

<script>
	import cartItem from './cart-item'
	export default {
		name: 'shopping-cart',
		data() {
			return {
				visible: false
			}
		},
		props: {

		},
		computed: {
			goodsNum() {
				var result = 0;
				this.shoppingCart.forEach(value => {
					result += value.amount * 1;
				})
				return result;
			},
			shoppingCart() {
				return this.$store.state.cart.shoppingCart;
			},
			goodsList() {
				return this.$store.state.goods.goodsList;
			},
			totalPrice() {
				return this.$store.getters.totalPrice;
			}
		},
		methods: {
			clear() {
				this.visible = false;
				this.$store.commit('clearCart');
				this.$message({
					message: '购物车已被清空',
					type: 'success'
				})
			},
			goto() {
				this.$router.push({
					path: '/sale/checkout'
				})
			}
		},
		components: {
			cartItem
		}
	}
</script>

<style>

</style>