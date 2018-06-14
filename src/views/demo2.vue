<template>
	<div>
		<button @click="showGoods">点击</button>
	</div>
</template>

<script>
	import shoppingCart from '@/components/sale/shopping-cart'
	import cartItem from '@/components/sale/cart-item'
	import recommendLine from '@/components/sale/recommend-line'
	import sideMenu from '@/components/sale/sidemenu'
	import discountForm from '@/components/manage/discount/discount-form'
	export default {
		data() {
			return {
				
			}
		},
		created() {
			/*
			this.$store.dispatch('loadCurrentMonthRecord');
			console.log(this.$store.state.saleRecord.currentMonthRecord)
			this.$store.dispatch('loadTypeNames');
			*/
			
		},
		methods: {
			showGoods() {
				this.$store.dispatch("loadCustomerConsume", {
				year: 2000
			});
			console.log(this.$store.getters.getCustomerConsumeByYear(2016));
			}
		},
		components: {
			shoppingCart,
			cartItem,
			recommendLine,
			sideMenu,
			discountForm
		}
	}
</script>

<style>
</style>