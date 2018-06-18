<template>
	<div>
		<el-row>
			<el-col>
				<el-col :span="8">
					<el-input v-model="goods_name" placeholder="请输入商品名"></el-input>
				</el-col>
				<h1>商品库存</h1>
				<stock-list :stock-list="stockList"></stock-list>
			</el-col>
		</el-row>
		<br />
		<el-row>
			<el-col>
				<el-button type="primary" @click="dialogVisible = true" round>生成进货订单</el-button>
			</el-col>
		</el-row>
		<el-dialog title="进货订单" :visible.sync="dialogVisible" width="30%">
			<import-list :import-list="importList"></import-list>
			<el-row>
				<el-col :span="8" :offset="8">
					<el-popover placement="top" width="400" trigger="click" v-model="seem">
						<import-form @add="handleAdd" @cancel="handleCancel"></import-form>
						<el-button slot="reference">添加</el-button>
					</el-popover>
				</el-col>
			</el-row>
			<span slot="footer" class="dialog-footer">
    			<el-button @click="dialogVisible = false">取 消</el-button>
    			<el-button type="primary" @click="add">确 定</el-button>
  			</span>
		</el-dialog>
	</div>
</template>

<script>
	import stockList from '@/components/manage/stock-list'
	import importList from '@/components/manage/import-list'
	import importForm from '@/components/manage/import-form'
	export default {
		data() {
			return {
				dialogVisible: false,
				goods_name: '',
				importList: [],
				seem: false
			}
		},
		computed: {
			showList() {
				var result = [];
				this.stockList.forEach(value => {
					if(value.goods_name.indexOf(this.goods_name) != -1) {
						result.push(value)
					}
				})
				return result;
			},
			stockList() {
				var result = [];
				this.$store.state.goods.stockList.forEach(value => {
					result.push({
						goods_name: this.$store.getters.getGoodsById(value.goods_id).goods_name,
						stock: value.remain,
						goods_id: value.goods_id
					})
				})
				return result;
			}
		},
		created() {
			this.$store.dispatch('loadStockList');
			this.$axios.get('/api/goods/getRecommendImportList').then(res => {
				res.data.forEach(value => {
					this.importList.push({
						goods_id: value.goods_id,
						goods_name: this.$store.getters.getGoodsById(value.goods_id).goods_name,
						import_amount: value.import_amount
					})
					this.$store.commit('loadRecommendImportList', this.importList);
				})
			})
		},
		methods: {
			add() {
				this.$axios.post('/api/goods/addImportRecord', {
					import_list: this.$store.state.goods.recommendImportList
				}).then(res => {
					this.$store.commit('loadRecommendImportList', []);
					this.$store.dispatch('loadStockList');
					this.dialogVisible = false
				})
			},
			handleAdd(form) {
				this.importList.push({
					goods_id: this.$store.getters.getGoodsByName(form.goodsName).goods_id,
					goods_name: form.goodsName,
					import_amount: form.importAmount
				})
				this.seem = false;
				this.$store.commit('loadRecommendImportList', this.importList);
			},
			handleCancel() {
				this.seem = false;
			}
		},
		components: {
			stockList,
			importList,
			importForm
		}
	}
</script>

<style>
</style>