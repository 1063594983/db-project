<template>
	<div>
		<el-row>
			<h3>{{text}}</h3>
			<hr />
		</el-row>
		<el-row>
			<el-col v-for="x in lineSize" :span="span" :offset="x == 1 ? offset : 1" :key="x">
				<goods-card :goods-details="recommendList[x - 1]"></goods-card>
			</el-col>
		</el-row>
		<hr />
	</div>
</template>

<script>
	import goodsCard from './goods-card'
	export default {
		data() {
			return {

			}
		},
		computed: {
			span() {
				return Math.floor((23 - this.lineSize) / this.lineSize);
			},
			offset() {
				return Math.floor((21 - this.span * this.lineSize) / 2);
			}
		},
		props: {
			recommendList: {
				type: Array
			},
			lineSize: {
				type: Number,
				default: 4
			},
			text: {
				type: String
			}
		},
		components: {
			goodsCard
		}
	}
</script>

<style>

</style>