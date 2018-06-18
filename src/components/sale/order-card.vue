<template>
	<div>
		<el-card>
			<el-row v-for="(record, index) in goods" :key="index">
				<el-col :span="8">
					<img :src="JSON.parse($store.getters.getGoodsById(record.goods_id).goods_image)[0].src" />
				</el-col>
				<el-col :span="12">
					<el-row>
						<el-col>
							<h3>{{$store.getters.getGoodsById(record.goods_id).goods_name}}</h3>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<b style="color: red;">￥{{$store.getters.getGoodsById(record.goods_id).goods_price}}</b>
							<br /> X {{record.amount}}
						</el-col>
					</el-row>
				</el-col>
			</el-row>
			<el-row>
				<el-col :offset="5">
					<h3>共{{goodsNum}}件商品 合计: ￥{{totalPrice}}</h3>
				</el-col>
			</el-row>
			<el-row>
				<el-col :offset="10">
					<el-button v-if="type==1" type="primary" @click="confirmReceive" round>确认收货</el-button>
					<el-button v-if="type==2" type="primary" @click="dialogVisible = true" round>评价</el-button>
				</el-col>
			</el-row>
			<el-dialog title="商品评价" :visible.sync="dialogVisible">
				<div>
					<el-row v-for="(item, index) in goods" :key="item.index">
						<el-col :span="3">
							<img :src="JSON.parse($store.getters.getGoodsById(item.goods_id).goods_image)[0].src" />
						</el-col>
						<el-rate v-model="rank[index]" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" show-text>
						</el-rate>
						<el-col :span="12" :offset="2">
							<el-input v-model="comment[index]" style="height: 100px; width: 600px;" type="textarea"></el-input>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8" :offset="8">
							<el-button type="primary" @click="submit" round>提交</el-button>
						</el-col>
					</el-row>
				</div>
			</el-dialog>
		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				dialogVisible: false,
				rank: [],
				value: 3,
				comment: []
			}
		},
		props: {
			goods: Array,
			type: Number,
			totalPrice: Number,
			recordId: Number
		},
		computed: {
			goodsNum() {
				var result = 0;
				this.goods.forEach(value => {
					result += value.amount;
				})
				return result;
			},
			goodsList() {
				return this.$store.state.goodsList;
			}
		},
		created() {
			this.rank = [];
			this.comment = [];
			this.goods.forEach(value => {
				this.rank.push(3);
				this.comment.push("默认好评");
			})
		},
		methods: {
			confirmReceive() {
				this.$emit('confirmReceive', this.recordId);
			},
			submit() {
				var data = [];
				this.goods.forEach((value, index) => {
					data.push({
						goods_id: value.goods_id,
						rank: this.rank[index],
						comment: this.comment[index],
						customer_id: this.$cookieStore.getCookie("username")
					})
				})
				this.$axios.post('/api/comment/addComment', {
					comments: data
				}).then(() => {
					this.$axios.post('/api/comment/confirmComment', {
						record_id: this.recordId
					}).then(() => {
						this.$message({
							message: '评论完成',
							type: 'success'
						})
						this.dialogVisible = false;
						this.$store.dispatch('loadCustomerRecord')
					})
				})
				
			}
		}
	}
</script>

<style>
	img {
		width: 100%;
		height: 100%;
	}
	
	i {
		cursor: pointer;
	}
</style>