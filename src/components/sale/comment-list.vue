<template>
	<div>
		<comment-card v-for="x in pageSize" v-if="getComment(x)" :comment="getComment(x)" :key="x"></comment-card>
		<el-pagination :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" 
			:total="commentNum" @current-change="handleCurrentChange">
		</el-pagination>
		
	</div>
</template>

<script>
	import commentCard from './comment-card'
	export default {
		data() {
			return {
				currentPage: 1
			}
		},
		props: {
			commentList: Array,
			pageSize: {
				type: Number,
				default: 4
			}
		},
		computed: {
			commentNum() {
				return this.commentList.length;
			}
		},
		methods: {
			getComment(x) {
				var index = (this.currentPage - 1) * this.pageSize + x - 1;
				if(index >= this.commentNum) {
					return false;
				} else {
					return this.commentList[index];
				}
			},
			handleCurrentChange() {
				
			}
		},
		components: {
			commentCard
		}
	}
</script>

<style>
</style>