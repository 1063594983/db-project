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
				<recommend-line :recommend-list="recommendList" :text="text"></recommend-line>
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
				recommendList: [{
					"type_id": 1,
					"goods_id": 1,
					"goods_name": "越南白心火龙果（1个）",
					"goods_description": "越南白心火龙果（1个）",
					"goods_price": 7.9,
					"goods_image": "[{\"src\": \"/static/images/fruits/dragon_fruit1.jpg\"}, {\"src\": \"/static/images/fruits/dragon_fruit2.jpg\"}]",
					"goods_source": "越南",
					"type_name": "生鲜水果"
				}, {
					"type_id": 1,
					"goods_id": 2,
					"goods_name": "山东红富士苹果（3个）",
					"goods_description": "山东红富士苹果（3个）",
					"goods_price": 6.9,
					"goods_image": "[{\"src\": \"/static/images/fruits/apple1.jpg\"}]",
					"goods_source": "山东",
					"type_name": "生鲜水果"
				}, {
					"type_id": 2,
					"goods_id": 3,
					"goods_name": "新西兰低脂牛奶（250ml x 24盒）",
					"goods_description": "新西兰低脂牛奶（250ml x 24盒）",
					"goods_price": 72,
					"goods_image": "[{\"src\": \"/static/images/food/milk1.jpg\"}]",
					"goods_source": "新西兰",
					"type_name": "进口食品"
				}, {
					"type_id": 3,
					"goods_id": 4,
					"goods_name": "三只松鼠开心果（225g x 1袋）",
					"goods_description": "三只松鼠开心果（225g x 1袋）",
					"goods_price": 28.9,
					"goods_image": "[{\"src\": \"/static/images/food/pistachio1.jpg\"}]",
					"goods_source": "上海",
					"type_name": "休闲零食"
				}],
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