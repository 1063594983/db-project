<template>
	<div>
		<el-card>
			<el-row>
				<el-col :span="4">
					<b>{{ comment.author }}</b>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="4">
					2018-05-02
				</el-col>
			</el-row>
			<br />
			<el-col :span="24" style="text-align: left;">
				{{ comment.content }}
			</el-col>
			<el-col :style="{height: '20px'}"></el-col>
		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: {
			comment: Object
		}
	}
</script>

<style>

</style>