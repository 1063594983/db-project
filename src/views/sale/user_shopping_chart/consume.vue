<template>
	<div>
		<el-row>
			<el-col :span="16" :offset="4">
				<el-card>
					<el-date-picker @change="update" v-model="year" type="year" placeholder="选择年">
					</el-date-picker>
					<div id="myChart" style="height: 500px; width: 1000px;">
					</div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				year: new Date()
			}
		},
		mounted() {
			this.drawLine()
		},
		methods: {
			update() {
				
			},
			drawLine() {
				var myChart = this.$echarts.init(document.getElementById('myChart'));
				var option = {
					title: {
						text: this.year.getFullYear() + '我的消费情况',
						left: 'center'
					},
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data: this.typeNames,
						top: 30,
						selected: {
							'生鲜水果': false,
							'进口食品': false,
							'休闲零食': false,
							'酒水乳饮': false,
							'粮油副食': false,
							'美妆个护': false,
							'家居用品': false,
							'家庭清洁': false,
							'母婴玩具': false
						}
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					toolbox: {
						feature: {
							saveAsImage: {}
						}
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月',
							'八月', '九月', '十月', '十一月', '十二月'
						],
						name: '月份'
					},
					yAxis: {
						name: '消费/元'
					},
					series: this.$store.state.chartData.lineChart
				};
				myChart.setOption(option);
			}
		}
	}
</script>

<style>

</style>