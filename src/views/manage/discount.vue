<template>
	<div>
		<el-row>
			<el-col>
				<el-col :span="8">
					<el-input v-model="goods_name" placeholder="请输入商品名"></el-input>
				</el-col>
				<h1>当前优惠活动</h1>
				<discount-list :discount-list="showList" @remove="handleRemove"></discount-list>
			</el-col>
		</el-row>
		<br />
		<el-row>
			<el-col>
				<el-button type="primary" @click="dialogVisible = true" round>生成优惠活动</el-button>
			</el-col>
		</el-row>
		<el-dialog title="生成优惠活动" :visible.sync="dialogVisible" width="50%">
			<discount-list :discount-list="recommendDiscountList" @remove="handleRemove2"></discount-list>
			<br />
			<el-row>
				<el-col :span="8" :offset="8">
					<el-popover placement="top" width="400" trigger="click" v-model="seem">
						<discount-form @add="handleAdd" @cancel="handleCancel"></discount-form>
						<el-button slot="reference">添加</el-button>
					</el-popover>
				</el-col>
			</el-row>
			<span slot="footer" class="dialog-footer">
    			<el-button @click="dialogVisible = false">取 消</el-button>
    			<el-button type="primary" @click="add">添加优惠活动</el-button>
  			</span>
		</el-dialog>
	</div>
</template>

<script> 
	import discountList from '@/components/manage/discount-list'
	import discountForm from '@/components/manage/discount/discount-form'
	export default {
		data() {
			return {
				dialogVisible: false,
				goods_name: '',
				seem: false
			}
		},
		computed: {
			showList() {
				var result = [];
				this.discountList.forEach(value => {
					if(value.goods_name.indexOf(this.goods_name) != -1) {
						result.push(value);
					}
				})
				return result;
			},
			discountList() {
				var result = [];
				this.$store.state.goods.discountList.forEach(value => {
					result.push({
						goods_id: value.goods_id,
						goods_name: this.$store.getters.getGoodsById(value.goods_id).goods_name,
						discount: value.discount,
						start_time: new Date(value.start_time * 1).datetime(),
						end_time: new Date(value.end_time * 1).datetime(),
						discount_id: value.discount_id
					})
				})
				return result;
			},
			recommendDiscountList() {
				var result = [];
				this.$store.state.goods.recommendDiscountList.forEach(value => {
					result.push({
						goods_id: value.goods_id,
						goods_name: this.$store.getters.getGoodsById(value.goods_id).goods_name,
						discount: value.discount,
						start_time: new Date(value.start_time * 1).datetime(),
						end_time: new Date(value.end_time * 1).datetime(),
						discount_id: value.discount_id
					})
				})
				return result;
			}
		},
		created() {
			console.log(this.$store.state.goods.discountList)
			console.log(this.$store.getters.getGoodsById('1'))
			this.$store.dispatch('loadDiscountList');
			this.$store.dispatch('loadGoods')
			//this.$store.dispatch('loadRecommendDiscountList');
			this.$store.commit('loadRecommendDiscountList', []);
		},
		methods: {
			add() {
				this.dialogVisible = false
				this.$axios.post('/api/goods/addDiscount', {
					discount_list: this.recommendDiscountList
				}).then(res => {
					this.$store.dispatch('loadDiscountList');
					this.$store.commit('loadRecommendDiscountList', []);
				})
				this.$message({
					message: '添加成功',
					type: 'success'
				})
			},
			handleAdd(form) {
				this.recommendDiscountList.push({
					goods_id: this.$store.getters.getGoodsByName(form.goodsName).goods_id,
					goods_name: form.goodsName,
					discount: form.discount,
					start_time: form.startTime.datetime(),
					end_time: new Date(form.startTime.getTime() + form.stayDays * 24 * 60 * 60 * 1000).datetime()
				})
				//console.log(this.recommendDiscountList)
				console.log(this.$store.getters.getGoodsByName(form.goodsName))
				
				this.$message({
							message: '添加成功',
							type: 'success'
						})
				this.seem = false;
				
			},
			handleCancel() {
				this.seem = false;
				console.log('cancel');
			},
			handleRemove(discount_id) {
				this.$axios.post('/api/goods/deleteDiscount', {
					discount_id: discount_id
				}).then(res => {
					this.$store.dispatch('loadDiscountList');
				})
			},
			handleRemove2(discount_id) {
				
			}
		},
		components: {
			discountList,
			discountForm
		}
	}
</script>

<style>

</style>