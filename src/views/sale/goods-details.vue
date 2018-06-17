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
				<recommend-line :recommend-list="recommendList" :text="text"></recommend-line>
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