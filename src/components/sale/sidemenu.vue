<template>
	<div>
		<el-button @click="$router.go(-1)" icon="el-icon-d-arrow-left" title="返回" circle></el-button>
		<br />
		<br />
		<el-popover ref="popover1" placement="right-start" title="购物车" width="800px" trigger="hover" :value="seem">
			<shopping-cart></shopping-cart>
		</el-popover>
		<el-button v-popover:popover1 icon="el-icon-goods" circle></el-button>
		<br />
		<br />
		<el-button @click="goto" icon="el-icon-info" title="个人中心" circle></el-button>
	</div>
</template>
<script>
	import shoppingCart from './shopping-cart'
	export default {
		name: 'side-menu',
		data() {
			return {
				seem: false
			}
		},
		computed: {
			goodsNum() {
				var num = 0;
				this.shoppingCart.forEach(value => {
					num += value.amount;
				})
				return num;
			}
		},
		created() {
			
		},
		components: {
			shoppingCart
		},
		methods: {
			showCart() {
				this.seem = true;
			},
			fun1() {
				this.seem = false;
			},
			goto() {
				this.$router.push({
					path: '/sale/user-center'
				})
			},
			getGoods(goods_id) {
				var position;
				this.goodsList.forEach((value, index) => {
					if(value.goods_id == goods_id) {
						position = index;
					}
				})
				return this.goodsList[position];
			}
		}
	}
</script>

<style>

</style>