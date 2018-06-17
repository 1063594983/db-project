<template>
	<div>
		<goods-details :goods-details="$store.getters.getGoodsById(goods_id)" :commentSize="commentList.length"></goods-details>
		<el-row>
			<el-col :span="8" :offset="8">
				<h3>商品评价({{commentList.length}})</h3>
				<el-rate v-if="rank != 0" v-model="rank" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" disabled show-score>
				</el-rate>
				<p v-else>无人评价</p>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="10" :offset="7">
				<comment-list :comment-list="commentList"></comment-list>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="16" :offset="4">
				<recommend-line v-if="recommendList.length != 0" :recommend-list="recommendList" :text="text"></recommend-line>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import goodsDetails from '@/components/sale/goods-details'
	import commentList from '@/components/sale/comment-list'
	import recommendLine from '@/components/sale/recommend-line'
	export default {
		data() {
			return {
				rank: 3,
				recommendList: [],
				text: '购买了此商品的顾客还买了',
				goods_id: ''
			}
		},
		computed: {
			goodsList() {
				return this.$store.state.goods.goodsList;
			},
			commentList() {
				return this.$store.getters.getCommentByGoodsId(this.goods_id);
			}
		},
		mounted() {
			this.goods_id = this.$router.currentRoute.path.split('/').pop();
		},
		created() {
			this.$store.dispatch("loadCurrentMonthRecord");
			this.goods_id = this.$router.currentRoute.path.split('/').pop();
			this.rank = this.$store.getters.getGoodsById(this.goods_id).rank.toFixed(1) * 1;
			this.$axios.get('/api/goods/getRelativeGoodsById', {
				params: {
					goods_id: this.goods_id
				}
			}).then(res => {
				res.data.forEach(value => {
					this.recommendList.push(this.$store.getters.getGoodsById(value.goods_id2));
				})
			})
		},
		methods: {
			
		},
		components: {
			goodsDetails,
			commentList,
			recommendLine
		}
	}
</script>

<style>

</style>