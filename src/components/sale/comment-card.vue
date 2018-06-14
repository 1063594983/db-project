<template>
	<div>
		<el-card>
			<el-row>
				<el-col :span="4">
					<b>用户: {{ comment.author }}</b>
				</el-col>
				<el-col :span="8" :offset="4">
					<el-rate show-text v-model="comment.rank" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" disabled>
					</el-rate>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					{{ time }}
				</el-col>
			</el-row>
			<br />
			<el-col :span="22" :offset="2" style="text-align: left;">
				{{ comment.content }}
			</el-col>
			<el-col :style="{height: '20px'}">
				
			</el-col>
		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		computed: {
			time() {
				var result = new Date(this.comment.time * 1).datetime();
				return result;
			}
		},
		props: {
			comment: Object
		}
	}
</script>

<style>

</style>