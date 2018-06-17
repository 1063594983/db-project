<template>
	<div>
		<el-row>
			<goods-filter @filter="handleFilter"></goods-filter>
		</el-row>
		<el-row>
			<el-col :offset="10" :span="4">
				<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
					<el-submenu index="1">
						<template slot="title">综合</template>
						<el-menu-item index="priceDec">价格降序</el-menu-item>
						<el-menu-item index="priceInc">价格升序</el-menu-item>
					</el-submenu>
					<el-menu-item index="saleDec">销量</el-menu-item>
					<el-menu-item index="rankDec">评价</el-menu-item>
				</el-menu>
			</el-col>
		</el-row>
		<br />
		<el-row v-for="x in lines" :key="x" v-if="seem">
			<el-col v-for="y in lineSize" :span="span" :offset="y == 1 ? offset : 0" v-if="getGoods(x, y)" :key="y">
				<goods-card :goods-details="getGoods(x, y)"></goods-card>
			</el-col>
		</el-row>
		<el-pagination :current-page.sync="currentPage" :page-size="lines * lineSize" layout="total, prev, pager, next" :total="goodsNum" @current-change="handleCurrentChange">
		</el-pagination>
	</div>
</template>

<script>
	import goodsCard from './goods-card'
	import goodsFilter from '@/components/sale/goods-filter'
	export default {
		data() {
			return {
				currentPage: 1,
				activeIndex: '1-1',
				seem: true
			}
		},
		computed: {
			goodsNum() {
				return this.goodsList.length;
			},
			span() {
				return Math.floor((23 - this.lineSize) / this.lineSize);
			},
			offset() {
				return(24 - this.span * this.lineSize) / 2;
			},
			pageSize() {
				return this.lines * this.lineSize;
			}
		},
		props: {
			goodsList: {
				type: Array
			},
			lines: {
				type: Number,
				default: 2
			},
			lineSize: {
				type: Number,
				default: 4
			}
		},
		created() {
			if(this.$router.currentRoute.query.page) {
				this.currentPage = this.$router.currentRoute.query.page * 1;
			}
		},
		methods: {
			getGoods(x, y) {
				var index = (x - 1) * this.lineSize + y - 1 + (this.currentPage - 1) * this.pageSize;
				if(index < this.goodsNum) {
					return this.goodsList[index];
				} else {
					return false;
				}
			},
			getIndex(x, y) {
				return(x - 1) * this.lineSize + y - 1;
			},
			handleCurrentChange() {
				this.$router.push({
					path: this.$router.currentRoute.path + "?page=" + this.currentPage
				})
			},
			handleSelect(index, indexPath) {
				switch (index){
					case 'priceDec':
						this.seem = false
						this.decOrder();
						this.seem = true;
						break;
					case 'priceInc':
						this.seem = false
						this.incOrder();
						this.seem = true;
						break;
					case 'saleDec':
						this.seem = false;
						this.saleDecOrder();
						this.seem = true;
						break;
					case 'rankDec':
						this.seem = false;
						this.rankDecOrder();
						this.seem = true;
					default:
						break;
				}
			},
			handleFilter(option) {
				this.$emit('filter', option);
			},
			decOrder() {
				for(let i = 0; i < this.goodsNum - 1; i++) {
					for(let j = i + 1; j < this.goodsNum; j++) {
						if(this.goodsList[i].goods_price < this.goodsList[j].goods_price) {
							let temp = this.goodsList[i];
							this.goodsList[i] = this.goodsList[j];
							this.goodsList[j] = temp;
						}
					}
				}
			},
			incOrder() {
				for(let i = 0; i < this.goodsNum - 1; i++) {
					for(let j = i + 1; j < this.goodsNum; j++) {
						if(this.goodsList[i].goods_price > this.goodsList[j].goods_price) {
							let temp = this.goodsList[i];
							this.goodsList[i] = this.goodsList[j];
							this.goodsList[j] = temp;
						}
					}
				}
			},
			saleDecOrder() {
				for(let i = 0; i < this.goodsNum - 1; i++) {
					for(let j = i + 1; j < this.goodsNum; j++) {
						if(this.$store.getters.getMonthRecordById(this.goodsList[i].goods_id) 
							< this.$store.getters.getMonthRecordById(this.goodsList[j].goods_id)) {
								let temp = this.goodsList[i];
								this.goodsList[i] = this.goodsList[j];
								this.goodsList[j] = temp;
							}
					}
				}
			},
			rankDecOrder() {
				for(let i = 0; i < this.goodsNum - 1; i++) {
					for(let j = i + 1; j < this.goodsNum; j++) {
						if(this.$store.getters.getGoodsRankById(this.goodsList[i].goods_id) 
							< this.$store.getters.getGoodsRankById(this.goodsList[j].goods_id)) {
								let temp = this.goodsList[i];
								this.goodsList[i] = this.goodsList[j];
								this.goodsList[j] = temp;
							}
					}
				}
			}
		},
		components: {
			goodsCard,
			goodsFilter
		}
	}
</script>

<style>

</style>