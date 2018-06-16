<template>
	<div>
		<el-col :span="8" :offset="8">
			<el-input placeholder="请输入商品名" v-model="goods_name"></el-input>
		</el-col>
		<br />
		<goods-list :goods-list="showList" @filter="handleFilter"></goods-list>
		<el-row>
			<el-col :span="18" :offset="3">
				<recommend-line :recommend-list="recommendList" :text="text"></recommend-line>
			</el-col>
		</el-row>
		<el-dialog title="选择喜好" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<recommend-card @confirm="handleConfirm"></recommend-card>		
		</el-dialog>
	</div>
</template>

<script>
	import goodsList from '@/components/sale/goods-list'
	import recommendLine from '@/components/sale/recommend-line'
	import recommendCard from '@/components/sale/recommend-card'
	export default {
		data() {
			return {
				goodsListFiltered: [],
				text: '你可能想买',
				goods_name: '',
				dialogVisible: false
			}
		},
		computed: {
			showList() {
				var result = [];
				this.goodsListFiltered.forEach(value => {
					if(value.goods_name.indexOf(this.goods_name) != -1) {
						result.push(value);
					}
				})
				return result;
			},
			recommendList() {
				return this.$store.state.goods.recommendGoodsList
			},
			goodsList() {
				return this.$store.state.goods.goodsList;
			}
		},
		created() {
			this.goodsListFiltered = this.goodsList;
			this.$store.dispatch("loadCurrentMonthRecord");
			this.$axios.get('/api/customer/getCustomerInfo', {
				params: {
					customer_id: this.$cookieStore.getCookie('username')
				}
			}).then(res => {
				if(res.data[0].is_first == 1) {
					this.dialogVisible = true;
				} else {
					this.dialogVisible = false;
				}
			})
			this.$store.dispatch('loadGoods')	
			this.$store.dispatch('loadRecommendGoodsList')								
			this.$store.dispatch("loadTypeNames");
			this.$store.dispatch('loadStockList');
			this.$store.dispatch('loadComments');
			this.$store.dispatch('loadGoodsRank');
		},
		methods: {
			handleFilter(option) {
				this.filterOption = option;
				console.log(this.filterOption)
				this.updateList();
			},
			updateList() {
				var minPrice = this.filterOption.price.minPrice;
				var maxPrice = this.filterOption.price.maxPrice;
				var isDiscount = this.filterOption.discount;
				var types = this.filterOption.type;
				var result = [];				
				var temp = [];
				if(this.filterOption.discount == 1) {
					temp = this.goodsList;
				} else if(this.filterOption.discount == 2) {
					this.goodsList.forEach(value => {
						if(this.$store.getters.isDiscount(value.goods_id)) {
							temp.push(value);
						}
					})
				} else {
					this.goodsList.forEach(value => {
						if(!this.$store.getters.isDiscount(value.goods_id)) {
							temp.push(value);
						}
					})
				}
				temp.forEach(value => {
					if(types.indexOf(value.type_name) != -1 &&
						value.goods_price >= (minPrice == '' ? 0 : minPrice) &&
						value.goods_price <= (maxPrice == '' ? 9999 : maxPrice)) {
						result.push(value);
					}
				})
				this.goodsListFiltered = result;
			},
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			handleConfirm(habit) {
				this.dialogVisible = false;
				console.log(habit);
				this.$axios.post('/api/customer/confirmRecommend', {
					customer_id: this.$cookieStore.getCookie('username'),
					habit: habit
				}).then(res => {
					
				})
			}
		},
		components: {
			goodsList,
			recommendLine,
			recommendCard
		}
	}
</script>

<style>

</style>