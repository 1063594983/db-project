<template>
	<div>
		<el-row v-if="shoppingCart.length != 0" v-for="item in shoppingCart" :key="item.goods_id">
			<el-col :span="8" :offset="8">
				<cart-item :goods-details="$store.getters.getGoodsById(item.goods_id)" :goods-amount="item.amount"></cart-item>
			</el-col>
		</el-row>
		<br />
		<el-row v-if="shoppingCart.length != 0">
			<el-col>
				<h3>共{{goodsNum}}件商品 合计: ￥{{totalPrice}}</h3>
			</el-col>
		</el-row>
		<el-col :span="6" :offset="9" v-if="shoppingCart.length != 0">
			<el-button type="primary" @click="buyGoods">支付</el-button>
		</el-col>
		<br />
		<br />
		<el-row v-if="shoppingCart.length != 0">
			<el-col :span="18" :offset="3">
				<recommend-line :line-size="recommendList.length" :recommend-list="recommendList" :text="text"></recommend-line>
			</el-col>
		</el-row>
		<el-col :span="6" :offset="9" v-if="shoppingCart.length == 0">
			当前购物车为空
			<br />
			<br />
			<el-button type="primary" @click="$router.push({
					path: '/sale/goods-sale'
				})">继续购物</el-button>
		</el-col>
	</div>
</template>

<script>
	import cartItem from '@/components/sale/cart-item'
	import recommendLine from '@/components/sale/recommend-line'
	export default {
		data() {
			return {
				recommendList: [],
				text: '你可能还想买'
			}
		},
		computed: {
			shoppingCart() {
				return this.$store.state.cart.shoppingCart;
			},
			goodsNum() {
				var result = 0;
				this.shoppingCart.forEach(value => {
					result += value.amount * 1;
				})
				return result;
			},
			totalPrice() {
				return this.$store.getters.totalPrice;
			},
			goodsList() {
				return this.$store.state.goodsList;
			}
		},
		created() {
			this.$axios.get('/api/goods/getRecommendGoodsListByCart', {
				params: {
					shopping_cart: this.$store.state.cart.shoppingCart
				}
			}).then(res => {
				if(res.data != "") {
					res.data.forEach(value => {
					this.recommendList.push(this.$store.getters.getGoodsById(value.goods_id));
				})
				}			
			})
		},
		methods: {
			buyGoods() {
				this.$store.dispatch('buyGoods');
				this.$message({
					message: '购买成功!',
					type: 'success'
				})
				
			},
			getGoodsById(goods_id) {
				let position;
				this.goodsList.forEach((value, index) => {
					if(value.goods_id == goods_id) {
						position = index; 
					}
				})
				return this.goodsList[position];
			}
		},
		components: {
			cartItem,
			recommendLine
		}
	}
</script>

<style>

</style>